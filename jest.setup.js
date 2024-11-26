
import "@testing-library/jest-dom";

// Mock `import.meta.env`
Object.defineProperty(global, "import", {
  writable: true, 
  value: {
    meta: {
      env: {
        VITE_GOOGLE_CLIENT_ID: "test-client-id",
      },
    },
  },
});
