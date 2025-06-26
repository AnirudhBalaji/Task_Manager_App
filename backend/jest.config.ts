import type { Config } from 'jest';

const config: Config = {
  displayName: 'backend',
  preset: '../jest.preset.js', // Points to the workspace root preset (correct)
  testEnvironment: 'node',
  transform: {
    // Corrected tsconfig path: now relative to <rootDir>/backend
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/backend/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  // Corrected coverageDirectory path: now relative to <rootDir>/coverage/backend
  coverageDirectory: '<rootDir>/coverage/backend',
};

export default config;
