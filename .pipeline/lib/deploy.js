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
    ...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/client-deploy-config.yml`, {
      param: {
        CPU: phases[phase].client_cpu,
        ENV: phases[phase].phase,
        HOST: phases[phase].host,
        MEMORY: phases[phase].client_memory,
        NAME: `${phases[phase].name}-client`,
        SUFFIX: phases[phase].suffix,
        VERSION: phases[phase].tag,
      },
    }),
  );

//   objects.push(
//     ...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/configmaps/api-appsettings.yml`, {
//       param: {
//         ENV: phases[phase].phase,
//       },
//     }),
//   );

  objects.push(
    ...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/api-deploy-config.yml`, {
      param: {
        HOST: phases[phase].host,
        CPU: phases[phase].api_cpu,
        ENV: phases[phase].phase,
        MEMORY: phases[phase].api_memory,
        NAME: `${phases[phase].name}-api`,
        SUFFIX: phases[phase].suffix,
        VERSION: phases[phase].tag,
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
