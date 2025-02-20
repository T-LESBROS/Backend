module.exports = {
  default: {
    require: ['src/tests/steps/*.js'],
    format: ['progress'],
    paths: ['src/tests/features/*.feature'],
    worldParameters: { persistence: 'memory' }
  },
  mongo: {
    require: ['src/tests/steps/*.js'],
    format: ['progress'],
    paths: ['src/tests/features/*.feature'],
    tags: '@critical',
    worldParameters: { persistence: 'mongo' }
  }
};
