import { test } from '@playwright/test';
import { ManPage } from '../../pages/man.page';

test.describe('MAN - Create New', () => {

  test.beforeEach(async ({ page }) => {
    const man: ManPage = new ManPage(page);
    await man.navigateToMan();
  });

  test('Verify user can create new MAN', async ({ page }) => {
    const man: ManPage = new ManPage(page);
    await man.createNewMan();
  });

});