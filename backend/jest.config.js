module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testRegex: ".*\\.(test|spec)\\.(ts|tsx|js)$",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transformIgnorePatterns: [
    '/node_modules/(?!cpf-cnpj-validator)',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      isolatedModules: true,
    },
  },
  silent: true,
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
};
