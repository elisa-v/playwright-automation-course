// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  workers: 3, //disabling parallel mechanism
  timeout: 30 * 1000, // global timeout
  expect: {
    timeout: 5000,
  },
  reporter: 'html',

  projects: [
    {
      name: "chromium1",
      use: {
        browserName: 'chromium',  // "webkit" for Safari
        headless: false,
        screenshot: 'on',
        // trace: 'on', //log info to 
        trace: 'on', //log info to debug in case it fails, 'retain-on-failure'
        //viewport: { width: 720, height: 720 }
      },
    },
    {
      name: "chromium2",
      use: {
        browserName: 'chromium',  // "webkit" for Safari
        headless: true,
        screenshot: 'on',
        // trace: 'on', //log info to 
        trace: 'on', //log info to debug in case it fails, 'retain-on-failure'

      },
    },

    {
      name: "safari",
      use: {
        browserName: 'webkit',  // "webkit" for Safari
        headless: false,
        screenshot: 'on',
        trace: 'on',
        ...devices['iPhone 11'],
        ignoreHttpsErrors: true,
        viewport: { width: 720, height: 720 },
        permissions: ['geolocation'],
        video: 'retain-on-failure'
      },
    }

  ]


});

