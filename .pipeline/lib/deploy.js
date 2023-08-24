const { OpenShiftClientX } = require('@bcgov/pipeline-cli');
const path = require('path');

module.exports = (settings) => {
  const phases = settings.phases;
  const options = settings.options;
  const phase = options.env;
  const changeId = phases[phase].changeId;
  const oc = new OpenShiftClientX(Object.assign({ namespace: phases[phase].namespace }, options));
  const templatesLocalBaseUrl = oc.toFileUrl(path.resolve(__dirname, '../../openshift'));
  var objects = [];

  objects.push(
    ...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/client-deploy-config.yaml`, {
      param: {
        NAME: `${phases[phase].name}-client`,
        SUFFIX: phases[phase].suffix,
        VERSION: phases[phase].tag,
        ENV: phases[phase].phase,
        HOST: phases[phase].host,
        CPU: phases[phase].cpu,
        MEMORY: phases[phase].memory,
      },
    }),
  );

//   objects.push(
//     ...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/configmaps/api-appsettings.yaml`, {
//       param: {
//         ENV: phases[phase].phase,
//       },
//     }),
//   );

  objects.push(
    ...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/api-deploy-config.yaml`, {
      param: {
        NAME: `${phases[phase].name}-api`,
        DB_NAME: `${phases[phase].name}`,
        SUFFIX: phases[phase].suffix,
        VERSION: phases[phase].tag,
        HOST: phases[phase].host,
        ENV: phases[phase].phase,
        CPU: phases[phase].cpu,
        MEMORY: phases[phase].memory,
      },
    }),
  );

  oc.applyRecommendedLabels(
    objects,
    phases[phase].name,
    phase,
    `${changeId}`,
    phases[phase].instance,
  );
  oc.importImageStreams(objects, phases[phase].tag, phases.build.namespace, phases.build.tag);
  oc.applyAndDeploy(objects, phases[phase].instance);
};
