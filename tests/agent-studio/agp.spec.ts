import { test, expect } from '@playwright/test';
import { AgpPage } from '../pages/agp.page';

test.describe('Agent Studio - AGP Module', () => {

  let agp: AgpPage;

  /* ================================= */
  /* GLOBAL SETUP */
  /* Runs before each test */
  /* ================================= */

  test.beforeEach(async ({ page }) => {
    agp = new AgpPage(page);

    console.log("🔹 Navigating to AGP module");

    await agp.navigateToAgp();
  });


  /* ================================= */
  /* SMOKE TEST */
  /* ================================= */

  test('@smoke @ui AGP-001 Verify user can open AGP module', async () => {
    console.log("✅ AGP opened successfully");

    await expect(agp.createRuleButton).toBeVisible();
  });


  /* ================================= */
  /* REGRESSION TEST */
  /* ================================= */

  test('@regression @ui AGP-002 Verify user can create new AGP rule', async () => {
    await agp.createRule();
  });


  /* ================================= */
  /* UI TEST */
  /* ================================= */

  test('@ui AGP-003 Verify Create Rule button is visible and enabled', async () => {
    await expect(agp.createRuleButton).toBeVisible();
    await expect(agp.createRuleButton).toBeEnabled();
  });


  /* ================================= */
  /* NEGATIVE TEST */
  /* ================================= */

  test('@negative @regression AGP-004 Verify rule creation fails without required fields', async ({ page }) => {
    console.log("⚠️ Testing negative scenario");

    await agp.createRuleButton.click();

    await agp.ruleNameInput.fill('');

    await agp.createRuleSubmitButton.click();

    await expect(
      page.getByText(/required/i)
    ).toBeVisible();
  });


  /* ================================= */
  /* SANITY TEST */
  /* ================================= */

  test('@sanity AGP-005 Verify file upload input exists', async () => {
    await expect(agp.fileUploadInput).toBeVisible();
  });

});