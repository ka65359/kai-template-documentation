module.exports = exports = {
  testURL: "http://localhost/",
  collectCoverageFrom: [
    "**/src/**/*.js",
    "!**/src/setupTests.js",
    "!**/__tests__/**",
    "!**/node_modules/**"
  ],
  coverageReporters: ["text", "html"],
  moduleFileExtensions: ["js", "json", "jsx", "node"],
  testPathIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^constants": require.resolve("./src/constants"),
    "^core": require.resolve("./src/core"),
    "^store$": require.resolve("./src/store"),
    "^store/actions$": require.resolve("./src/store/actions"),
    "^store/selectors": require.resolve("./src/store/selectors"),
    "^utils/features": require.resolve("./src/utils/features"),
    "\\.(css|scss)$": require.resolve("./test/style-mock"),
    "\\.(gif|jpg|png|svg)$": require.resolve("./test/file-mock.js")
  },
  setupFilesAfterEnv: ["./test/setup-test-framework"],
  verbose: true
};
