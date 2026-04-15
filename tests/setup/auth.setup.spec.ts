import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Global Login Setup', async ({ page }) => {

  const login: LoginPage = new LoginPage(page);

  // Go to base URL
  await page.goto(process.env.BASE_URL as string, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // Perform login
  await login.loginWithPassword(
    process.env.USER_EMAIL as string,
    process.env.USER_PASSWORD as string
  );

  // Wait until dashboard fully loads
  await page.waitForURL('**/sai', { timeout: 60000 });

  // Save session
  await page.context().storageState({
    path: 'storage/auth.json',
  });

  console.log('✅ Auth session saved successfully');

});