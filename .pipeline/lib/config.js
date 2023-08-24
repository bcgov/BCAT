const options = require('@bcgov/pipeline-cli').Util.parseArguments();

const changeId = options.pr;
const name = 'bcat';

Object.assign(options.git, { owner: 'bcgov', repository: 'BCAT' });
const phases = {
  build: {
    namespace: 'bfe2da-dev',
    name: `${name}`,
    phase: 'build',
    changeId: changeId,
    suffix: `-build-${changeId}`,
    instance: `${name}-build-${changeId}`,
    version: `${version}-${changeId}`,
    tag: `build-${version}-${changeId}`,
    transient: true,
  },
  dev: {
    namespace: 'bfe2da-dev',
    name: `${name}`,
    phase: 'dev',
    changeId: changeId,
    suffix: `-dev-${changeId}`,
    instance: `${name}-dev-${changeId}`,
    version: `1.0.0-${changeId}`,
    tag: `dev-${changeId}`,
    host: `bfe2da-dev.apps.silver.devops.gov.bc.ca`,
    url_prefix: 'dev-',
    transient: true,
    cpu: '100m',
    memory: '512Mi',
  },
};

// This callback forces the node process to exit as failure.
process.on('unhandledRejection', (reason) => {
  console.log(reason);
  process.exit(1);
});

module.exports = exports = { phases, options };
