const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');

test.describe('Authentication – Password Login', () => {

  test('Verify user can login using Email + Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginWithPassword(
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD
    );
  });

});
