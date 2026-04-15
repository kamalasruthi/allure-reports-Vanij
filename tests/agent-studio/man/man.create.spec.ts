const { test } = require('@playwright/test');
const { ManPage } = require('../../pages/man.page');

test.describe('MAN - Create New', () => {

  test.beforeEach(async ({ page }) => {

    const man = new ManPage(page);

    await man.navigateToMan();

  });


  test('Verify user can create new MAN', async ({ page }) => {

    const man = new ManPage(page);

    await man.createNewMan();

  });

});
