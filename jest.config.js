module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!<rootDir>/src/main/server.ts',
    '!<rootDir>/src/main/config/env.ts',
    '!<rootDir>/src/**/*protocols.ts',
    '!<rootDir>/src/infra/adapters/**',
    '!<rootDir>/src/validation/validators/email-validation.ts'
  ],
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
