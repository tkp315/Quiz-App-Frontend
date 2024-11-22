// jest.config.js
export default {
    testEnvironment: "jsdom", // Required for testing React components
    transform: {
      "^.+\\.jsx?$": "babel-jest", // Ensure `.jsx` files are processed
    },
    moduleFileExtensions: ["js", "jsx"], // Allow importing `.jsx` files
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Setup Jest after environment
    globals: {
      "babel-jest": {
        useESModules: true,
      },
    },
  };
  