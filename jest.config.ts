import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },

  transformIgnorePatterns: ["/node_modules/"],

  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/__test__/**/*.[jt]s?(x)",
    "**/tests/**/*.[jt]s?(x)",
  ],

  clearMocks: true,

  // coverage 측정시 필요한 provider (default: babel)
  coverageProvider: "v8",

  // coverage files 결과물을 출력하는 경로
  coverageDirectory: "<rootDir>/coverage",

  coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: false }]],

  // coverage 수집 범위 설정
  collectCoverageFrom: [
    "**/hooks/**/*.[jt]s?(x)",
    "**/components/**/*.[jt]s?(x)",
    "**/stores/**/*.[jt]s?(x)",
    "src/utils/**/*.[jt]s?(x)",

    "!**/components/skeletons/**/*.[jt]s?(x)",
    "!**/*.stories.[jt]s?(x)",
  ],

  // coverage 수집 제외 범위 설정
  coveragePathIgnorePatterns: [".next/"],
};

export default createJestConfig(config);
