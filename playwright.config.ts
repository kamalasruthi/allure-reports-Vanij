import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({

  testDir: './tests',

  testMatch: /.*\.spec\.(ts|js)/,

  timeout: 120000,

  fullyParallel: true,

  retries: 1,

  workers: 2,

  /* ================= REPORTERS ================= */

  reporter: [
    ['list'],
    ['allure-playwright']
  ],

  /* ================= GLOBAL USE ================= */

  use: {
    baseURL: process.env.BASE_URL,

    headless: false,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure',

    actionTimeout: 30000,

    navigationTimeout: 120000,
  },

  /* ================= BROWSERS ================= */

  projects: [

    /* Google Chrome */

    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],
      },
    },

    /* Microsoft Edge */

    {
      name: 'msedge',

      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },

    /* Firefox */

    {
      name: 'firefox',

      use: {
        ...devices['Desktop Firefox'],
      },
    },

    /* Safari */

    {
      name: 'webkit',

      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});