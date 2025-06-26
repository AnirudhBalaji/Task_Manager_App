import { getJestProjects } from '@nx/jest';

export default {
  displayName: 'backend',
  preset: '../../jest.preset.js',
  rootDir: '../../', // ✅ Fix the root directory
  testEnvironment: 'node',
  roots: ['<rootDir>/backend/src'],
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: 'coverage/backend',
};