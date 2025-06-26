import { Config } from 'jest';

const config: Config = {
  displayName: 'backend',
  preset: '<rootDir>/../jest.preset.js', 
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: 'coverage/backend',
  roots: ['<rootDir>/backend/src'],
};

export default config;