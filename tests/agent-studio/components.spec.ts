import { test } from '@playwright/test';
import { ComponentsPage } from '../pages/components.page';

test.describe('Agent Studio - Components Module', () => {

  let components: ComponentsPage;

  test.beforeEach(async ({ page }) => {
    components = new ComponentsPage(page);
    await components.navigateToComponents();
  });

  test('Verify user can open Components page and see components list', async () => {
    await components.verifyComponentsVisible();
  });

});