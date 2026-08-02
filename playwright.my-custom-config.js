// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  timeout: 40_000, //Timeout for each test
  expect: { timeout: 10_000 },//Timeout for each assertion


  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',

  // Allure Reporter
  reporter: [["line"], ["allure-playwright"]],
    
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: false,
    screenshot: 'on'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation']
      }
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: true,
        screenshot: 'on',
        trace: 'on'
      }
    },

    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'on',
        trace: 'on'
        //viewport:{width:700, height:500}
        //...devices['iPhone 15 Pro Max']
      }
    }

  ]

});

