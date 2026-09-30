import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  testMatch: "**/*.spec.ts",
  retries: 3,
  reporter: [["html", { outputFolder: "src/reports", open: "never" }]],
  use: {
    baseURL: "http://ec2-18-209-57-71.compute-1.amazonaws.com",
    // Collect trace when retrying the failed test.
    trace: "on-first-retry",
    actionTimeout: 10000,
    //  headless: true,
    screenshot: "only-on-failure",
    //video: 'retain-on-failure',
    //trace: 'retain-on-failure',
  },
});
