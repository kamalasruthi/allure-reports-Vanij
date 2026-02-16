const { test, expect } = require('@playwright/test');

test('check login session', async ({ page }) => {

  await page.goto('/sai');

  await page.waitForTimeout(5000);

  await page.screenshot({ path: 'debug.png', fullPage: true });

});
