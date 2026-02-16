const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');

test.describe('Authentication – OTP Login', () => {

  test('Verify user can login using Email + OTP', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginWithOTP(
      process.env.USER_EMAIL,
      process.env.STANDARD_OTP
    );
  });

});
