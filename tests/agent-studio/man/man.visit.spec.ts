import { test } from '@playwright/test';
import { ManPage } from '../../pages/man.page';

test.describe('MAN - Visit Page', () => {

  test('Verify user can visit MAN page', async ({ page }) => {
    const man: ManPage = new ManPage(page);

    await man.navigateToMan();
    await man.verifyManPageLoaded();
  });

});