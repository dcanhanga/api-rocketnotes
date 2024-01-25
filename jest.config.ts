import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  // coverageDirectory: 'coverage',
  testEnvironment: 'node',
  // collectCoverage: true,
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts?$': '@swc/jest'
  }
};

export default config;
