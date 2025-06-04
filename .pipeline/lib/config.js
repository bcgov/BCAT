const options = require('@bcgov/pipeline-cli').Util.parseArguments();

const changeId = options.pr;
const name = 'bcat';
const version = '1.1.0';

Object.assign(options.git, { owner: 'bcgov', repository: 'BCAT' });
const phases = {
  build: {
    changeId: changeId,
    instance: `${name}-build-${changeId}`,
    name: `${name}`,
    namespace: 'bfe2da-tools',
    phase: 'build',
    suffix: `-build-${changeId}`,
    tag: `build-${version}-${changeId}`,
    transient: true,
    version: `${version}-${changeId}`,
  },
  dev: {
    api_cpu: '250m',
    api_memory: '512Mi',
    changeId: changeId,
    client_cpu: '150m',
    client_memory: '512Mi',
    dbName: 'bcat',
    host: `bcat-bfe2da-dev.apps.silver.devops.gov.bc.ca`,
    instance: `${name}-dev-${changeId}`,
    name: `${name}`,
    namespace: 'bfe2da-dev',
    phase: 'dev',
    suffix: `-dev-${changeId}`,
    tag: `dev-${version}-${changeId}`,
    transient: true,
    url_prefix: 'dev-',
    version: `${version}-${changeId}`,
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
  prod: {
    api_cpu: '250m',
    api_memory: '512Mi',
    changeId: changeId,
    client_cpu: '150m',
    client_memory: '512Mi',
    host: `bcat-bfe2da-prod.apps.silver.devops.gov.bc.ca`,
    instance: `${name}-prod`,
    name: `${name}`,
    namespace: 'bfe2da-prod',
    phase: 'prod',
    suffix: `-prod`,
    tag: `prod-${version}`,
    url_prefix: '',
    version: `${version}`,
  },
};

// This callback forces the node process to exit as failure.
process.on('unhandledRejection', (reason) => {
  console.log(reason);
  process.exit(1);
});

module.exports = exports = { phases, options };
