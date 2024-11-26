// jest.config.js
export default {
    testEnvironment: "jsdom", 
    transform: {
      "^.+\\.jsx?$": "babel-jest", 
    },
    moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "tsx", "json", "node"], 
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Setup Jest after environment
    globals: {
      "babel-jest": {
        useESModules: true,
      },
    },
  };
  