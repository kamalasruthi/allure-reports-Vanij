const { test } = require('@playwright/test');
const { ManPage } = require('../../pages/man.page');

test.describe('MAN - Clone', () => {

  test.beforeEach(async ({ page }) => {

    const man = new ManPage(page);

    await man.navigateToMan();

  });


  test('Verify user can clone MAN', async ({ page }) => {

    const man = new ManPage(page);

    await man.cloneManProject();

  });

});
