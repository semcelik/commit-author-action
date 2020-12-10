module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./mocks/@actions/core.ts', './mocks/@actions/github.ts'],
  clearMocks: true,
};
