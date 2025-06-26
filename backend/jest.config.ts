export default {
  displayName: 'backend',
  preset: '../../jest.preset.js',
  rootDir: '../../',
  testEnvironment: 'node',
  roots: ['<rootDir>/backend/src'],
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: 'coverage/backend',
};