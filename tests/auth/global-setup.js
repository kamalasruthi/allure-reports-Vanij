const { chromium } = require('@playwright/test');

module.exports = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to login page
  await page.goto(process.env.BASE_URL);

  // ---- LOGIN STEPS ----
  await page.fill('#email', process.env.EMAIL);
  await page.fill('#password', process.env.PASSWORD);
  await page.click('button[type="submit"]');

  // Wait until user lands on home page
  await page.waitForURL(/sai|dashboard/, { timeout: 30000 });

  // Save session
  await context.storageState({ path: 'storageState.json' });

  await browser.close();
};
