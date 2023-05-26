const nextJest = require("next/jest")
const { pathsToModuleNameMapper } = require("ts-jest")

const { compilerOptions } = require("./tsconfig")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)test.[jt]s?(x)"],

  // Set up code coverage
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*{.ts,tsx}",
    "!src/**/*.(stories|constants|types|spec).{ts,tsx}",
    "!src/**/index.{ts,tsx}",
    "src/pages/index.${ts,tsx}",
    "!/node_modules/",
  ],
  // coverageThreshold: {
  //   global: {
  //     lines: 90,
  //   },
  // },
}

module.exports = createJestConfig(customJestConfig)
