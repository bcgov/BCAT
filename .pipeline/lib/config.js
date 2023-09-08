const options = require('@bcgov/pipeline-cli').Util.parseArguments();

const changeId = options.pr;
const name = 'bcat';
const version = '1.0.0';
let shortSha;

if (changeId && typeof changeId === 'string' && changeId.length > 7) {
  shortSha = changeId.slice(0, 7);
}

const devChangeId = shortSha || changeId;

Object.assign(options.git, { owner: 'bcgov', repository: 'BCAT' });
const phases = {
  build: {
    changeId: devChangeId,
    instance: `${name}-build-${devChangeId}`,
    name: `${name}`,
    namespace: 'bfe2da-tools',
    phase: 'build',
    suffix: `-build-${devChangeId}`,
    tag: `build-${version}-${devChangeId}`,
    transient: true,
    version: `${version}-${devChangeId}`,
  },
  dev: {
    api_cpu: '250m',
    api_memory: '512Mi',
    changeId: devChangeId,
    client_cpu: '150m',
    client_memory: '512Mi',
    dbName: 'bcat',
    host: `bcat-bfe2da-dev.apps.silver.devops.gov.bc.ca`,
    instance: `${name}-dev-${devChangeId}`,
    name: `${name}`,
    namespace: 'bfe2da-dev',
    phase: 'dev',
    suffix: `-dev-${devChangeId}`,
    tag: `dev-${version}-${devChangeId}`,
    transient: true,
    url_prefix: 'dev-',
    version: `${version}-${devChangeId}`,
  },
  test: {
    api_cpu: '250m',
    api_memory: '512Mi',
    changeId: changeId,
    client_cpu: '150m',
    client_memory: '512Mi',
    dbName: 'bcat',
    host: `bcat-bfe2da-test.apps.silver.devops.gov.bc.ca`,
    instance: `${name}-test`,
    name: `${name}`,
    namespace: 'bfe2da-test',
    phase: 'test',
    suffix: `-test`,
    tag: `test-${version}`,
    url_prefix: 'test-',
    version: `${version}`,
  },
};

// This callback forces the node process to exit as failure.
process.on('unhandledRejection', (reason) => {
  console.log(reason);
  process.exit(1);
});

module.exports = exports = { phases, options };
