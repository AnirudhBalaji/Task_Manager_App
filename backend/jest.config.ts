import { join } from 'path';
import { Config } from 'jest';

const config: Config = {
  displayName: 'backend',
  preset: join(__dirname, '..', '..', 'jest.preset.js'), // ✅ Dynamic path
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: 'coverage/backend',
  roots: ['<rootDir>/backend/src'],
};

export default config;