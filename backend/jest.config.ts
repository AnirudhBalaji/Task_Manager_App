import { join } from 'path';

export default {
  displayName: 'backend',
  preset: join(__dirname, '..', '..', 'jest.preset.js'),
  rootDir: '../../',
  testEnvironment: 'node',
  roots: ['<rootDir>/backend/src'],
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: 'coverage/backend',
};