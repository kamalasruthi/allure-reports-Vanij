// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Load environment variables
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({

  testDir: './tests',

  timeout: 60 * 1000,

  fullyParallel: false, // important for login stability

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: 1,

  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  use: {
    baseURL: process.env.BASE_URL,

    headless: false, // keep false while debugging

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    actionTimeout: 30 * 1000,
    navigationTimeout: 60 * 1000,
  },

  expect: {
    timeout: 10 * 1000,
  },

  projects: [

    /* ===============================
       🔐 AUTH TESTS (NO SESSION REUSE)
       =============================== */
    {
      name: 'auth-chromium',
      testMatch: /tests\/auth\/.*\.spec\.js/,
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
        storageState: undefined,
      },
    },

    {
      name: 'auth-firefox',
      testMatch: /tests\/auth\/.*\.spec\.js/,
      use: {
        browserName: 'firefox',
        ...devices['Desktop Firefox'],
        storageState: undefined,
      },
    },

    {
      name: 'auth-webkit',
      testMatch: /tests\/auth\/.*\.spec\.js/,
      use: {
        browserName: 'webkit',
        ...devices['Desktop Safari'],
        storageState: undefined,
      },
    },

    /* ===============================
       🔑 GLOBAL LOGIN SETUP (RUNS ONCE)
       =============================== */
    {
      name: 'setup',
      testMatch: /tests\/setup\/auth\.setup\.spec\.js/,
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
      },
    },

    /* ===============================
       🚀 LOGGED-IN TESTS – CHROMIUM
       =============================== */
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
        storageState: 'storage/auth.json',
      },
    },

    /* ===============================
       🚀 LOGGED-IN TESTS – FIREFOX
       =============================== */
    {
      name: 'firefox',
      dependencies: ['setup'],
      use: {
        browserName: 'firefox',
        ...devices['Desktop Firefox'],
        storageState: 'storage/auth.json',
      },
    },

    /* ===============================
       🚀 LOGGED-IN TESTS – WEBKIT (SAFARI)
       =============================== */
    {
      name: 'webkit',
      dependencies: ['setup'],
      use: {
        browserName: 'webkit',
        ...devices['Desktop Safari'],
        storageState: 'storage/auth.json',
      },
    },

  ],
});
