import { test } from '@playwright/test';
import { ManPage } from '../../pages/man.page';

test.describe('MAN - Open Existing', () => {

  test.beforeEach(async ({ page }) => {
    const man: ManPage = new ManPage(page);
    await man.navigateToMan();
  });

  test('Verify user can open existing MAN', async ({ page }) => {
    const man: ManPage = new ManPage(page);
    await man.openExistingMan();
  });

});