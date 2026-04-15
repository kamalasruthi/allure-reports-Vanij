import { test } from '@playwright/test';
import { CpaasPage } from '../pages/cpaas.page';

test.describe('Agent Studio - CPAAS Module', () => {

  let cpaas: CpaasPage;

  test.beforeEach(async ({ page }) => {
    cpaas = new CpaasPage(page);
    await cpaas.navigateToCpaas();
  });

  test('@smoke @ui Verify CPAAS loads', async () => {
    console.log("CPAAS Loaded");
  });

  test('@sanity Create Provider', async () => {
    await cpaas.createProvider(true);
  });

  test('@negative Create Provider without API key', async () => {
    await cpaas.createProvider(false);
  });

  test('@regression Edit Provider', async () => {
    await cpaas.createProvider(true);
    await cpaas.editProvider();
  });

  test('@regression Test Provider Connection', async () => {
    await cpaas.createProvider(true);
    await cpaas.testProviderConnection();
  });

  test('@regression Create Template', async () => {
    await cpaas.createProvider(true);
    await cpaas.createTemplate();
  });

  test('@regression Verify Dashboard', async () => {
    await cpaas.verifyDashboard();
  });

});