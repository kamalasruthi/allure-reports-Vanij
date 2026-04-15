import { test, expect } from '@playwright/test';
import { MarketplacePage } from './pages/marketplace.page';

test.describe('AI Marketplace Module', () => {

  let marketplace: MarketplacePage;

  /* ✅ Increase timeout for slow login/navigation */
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);

    marketplace = new MarketplacePage(page);

    await marketplace.navigateToMarketplace();
  });

  /* ================= UI LOAD ================= */
  test('@smoke Verify Marketplace UI Load', async () => {
    await marketplace.verifyMarketplaceLoaded();
  });

  /* ================= SEARCH ================= */
  test('@regression Verify Search Functionality', async () => {
    await marketplace.searchApp('AI');
    await marketplace.verifySearchResults();
  });

  /* ================= INVALID SEARCH ================= */
  test('@negative Verify Invalid Search', async () => {
    await marketplace.searchApp('@@@@@@');
    await marketplace.verifyNoResults();
  });

  /* ================= FILTER ================= */
  test('@regression Verify Filters', async () => {
    await marketplace.openCategoryFilter();
    await marketplace.openOrderFilter();
  });

  /* ================= NAVIGATION ================= */
  test('@smoke Verify App Navigation', async () => {
    await marketplace.openFirstApp();
  });

  /* ================= TRY LIVE ================= */
  test('@sanity Verify Try Live Chat', async () => {
    await marketplace.openFirstApp();
    await marketplace.clickTryLive();
    await marketplace.sendMessage('Generate a greeting message');
  });

});