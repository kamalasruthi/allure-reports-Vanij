import { test, expect } from '@playwright/test';

test('check login session', async ({ page }) => {

  await page.goto('/sai');

  // Optional wait (can be improved)
  await page.waitForTimeout(5000);

  // Take screenshot for debugging
  await page.screenshot({
    path: 'debug.png',
    fullPage: true
  });

});