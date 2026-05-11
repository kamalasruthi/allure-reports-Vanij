import { test } from '@playwright/test';
import { ManPage } from '../../pages/man.page';

test.describe('MAN - Clone', () => {

  test.beforeEach(async ({ page }) => {
    const man: ManPage = new ManPage(page);
    await man.navigateToMan();
  });

  test('Verify user can clone MAN', async ({ page }) => {
    const man: ManPage = new ManPage(page);
    await man.cloneManProject();
  });

});