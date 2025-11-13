// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 2,
  // to overide default configs
  timeout: 30 *1000, // global timeout
  expect: {
    timeout: 5000,
  },
  reporter : 'html',
  use: {
    browserName: 'chromium',  // "webkit" for Safari
    headless : false,
    screenshot : 'on',
    // trace: 'on', //log info to 
    trace: 'on', //log info to debug in case it fails, 'retain-on-failure'
    // video: 'off' // 'retain-on-failure' or 'on-first-retry'

    },

});

