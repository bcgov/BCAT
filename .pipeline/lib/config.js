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
    namespace: 'bfe2da-dev',
    name: `${name}`,
    phase: 'build',
    changeId: updatedChangeId,
    suffix: `-build-${updatedChangeId}`,
    instance: `${name}-build-${updatedChangeId}`,
    version: `${version}-${updatedChangeId}`,
    tag: `build-${version}-${updatedChangeId}`,
    transient: true,
  },
  dev: {
    namespace: 'bfe2da-dev',
    name: `${name}`,
    phase: 'dev',
    dbName: 'bcat',
    changeId: updatedChangeId,
    suffix: `-dev-${updatedChangeId}`,
    instance: `${name}-dev-${updatedChangeId}`,
    version: `${version}-${updatedChangeId}`,
    tag: `dev-${version}-${updatedChangeId}`,
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
