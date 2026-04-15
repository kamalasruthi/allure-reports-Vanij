const { test } = require('@playwright/test');
const { ManPage } = require('../../pages/man.page');

test.describe('MAN - Visit Page', () => {

  test('Verify user can visit MAN page', async ({ page }) => {

    const man = new ManPage(page);

    await man.navigateToMan();

    await man.verifyManPageLoaded();

  });

});
