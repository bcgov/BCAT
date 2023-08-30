const options = require('@bcgov/pipeline-cli').Util.parseArguments();

const changeId = options.pr;
const name = 'bcat';
const version = '1.0.0';
let shortSha;

if (changeId && typeof changeId === 'string') {
  shortSha = changeId.slice(0, 7);
}

const updatedChangeId = shortSha || changeId;

Object.assign(options.git, { owner: 'bcgov', repository: 'BCAT' });
const phases = {
  build: {
    changeId: updatedChangeId,
    instance: `${name}-build-${updatedChangeId}`,
    name: `${name}`,
    namespace: 'bfe2da-tools',
    phase: 'build',
    suffix: `-build-${updatedChangeId}`,
    tag: `build-${version}-${updatedChangeId}`,
    transient: true,
    version: `${version}-${updatedChangeId}`,
  },
  dev: {
    api_cpu: '500m',
    api_memory: '1.5Gi',
    changeId: updatedChangeId,
    client_cpu: '500m',
    client_memory: '1.5Gi',
    dbName: 'bcat',
    host: `bcat-bfe2da-dev.apps.silver.devops.gov.bc.ca`,
    instance: `${name}-dev-${updatedChangeId}`,
    name: `${name}`,
    namespace: 'bfe2da-dev',
    phase: 'dev',
    suffix: `-dev-${updatedChangeId}`,
    tag: `dev-${version}-${updatedChangeId}`,
    transient: true,
    url_prefix: "dev-",
    version: `${version}-${updatedChangeId}`,
  },
};

// This callback forces the node process to exit as failure.
process.on('unhandledRejection', (reason) => {
  console.log(reason);
  process.exit(1);
});

module.exports = exports = { phases, options };
