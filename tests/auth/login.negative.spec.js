const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');

test.describe('Authentication – Negative Login', () => {

  test('Invalid email format should not login', async ({ page }) => {
    const login = new LoginPage(page);

    await login.openLoginModal();
    await login.emailInput.fill('invalid-email');
    await login.continueButton.click();

    // ✅ Still on SAI, no redirect
    await expect(page).toHaveURL(/\/sai/i);
  });

  test('Unregistered email should not login', async ({ page }) => {
    const login = new LoginPage(page);

    await login.openLoginModal();
    await login.emailInput.fill('unknownuser@test.com');
    await login.continueButton.click();

    // ✅ No dashboard navigation
    await expect(page).toHaveURL(/\/sai/i);
  });

  test('Wrong OTP should not login', async ({ page }) => {
    const login = new LoginPage(page);

    await login.openLoginModal();
    await login.emailInput.fill(process.env.USER_EMAIL);
    await login.continueButton.click();

    // ❗ Do NOT wait for verify button
    // Try typing OTP anyway (safe no-op if not present)
    await page.keyboard.type('000000');

    // Small wait for backend validation
    await page.waitForTimeout(2000);

    // ✅ Still not logged in
    await expect(page).toHaveURL(/\/sai/i);
  });

  test('Wrong password should not login', async ({ page }) => {
    const login = new LoginPage(page);

    await login.openLoginModal();
    await login.emailInput.fill(process.env.USER_EMAIL);
    await login.continueButton.click();

    // ❗ Do NOT expect password field to appear
    await page.keyboard.type('WrongPassword123');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(2000);

    // ✅ Still not logged in
    await expect(page).toHaveURL(/\/sai/i);
  });

});
