import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class MarketplacePage {
  page: Page;

  /* NAV */
  aiMarketplaceMenu: Locator;

  /* PAGE */
  pageTitle: Locator;
  searchInput: Locator;
  filterPanel: Locator;
  appCards: Locator;
  exploreButton: Locator;

  /* FILTERS */
  categoryDropdown: Locator;
  orderByDropdown: Locator;

  /* APP DETAILS */
  tryLiveButton: Locator;
  chatInput: Locator;

  constructor(page: Page) {
    this.page = page;

    /* ✅ FIXED LOCATOR (NO STRICT MODE ISSUE) */
    this.aiMarketplaceMenu = page.getByRole('link', { name: 'AI Marketplace' });

    /* PAGE */
    this.pageTitle = page.locator('text=Ecosystem Spotlight');
    this.searchInput = page.locator('input[placeholder*="find"], input[placeholder*="Search"]');
    this.filterPanel = page.locator('text=Discovery');
    this.appCards = page.locator('[data-testid="app-card"], .rounded-xl');
    this.exploreButton = page.locator('text=Explore');

    /* FILTERS */
    this.categoryDropdown = page.locator('text=All Categories');
    this.orderByDropdown = page.locator('text=Newest');

    /* APP */
    this.tryLiveButton = page.locator('text=Try It Live');
    this.chatInput = page.locator('textarea, input[placeholder*="Ask"]');
  }

  /* ================= NAVIGATION ================= */

  async navigateToMarketplace(): Promise<void> {
    console.log("🌐 Opening SAI");

    await this.page.goto(`${process.env.BASE_URL}/sai`, {
      timeout: 120000
    });

    const login = new LoginPage(this.page);

    await login.loginWithPassword(
      process.env.USER_EMAIL as string,
      process.env.USER_PASSWORD as string
    );

    console.log("🚀 Clicking AI Marketplace");

    await expect(this.aiMarketplaceMenu).toBeVisible({ timeout: 60000 });
    await this.aiMarketplaceMenu.click();

    /* ✅ ADDED FOR STABILITY */
    await this.page.waitForLoadState('networkidle');

    await expect(this.pageTitle).toBeVisible({ timeout: 60000 });
  }

  /* ================= PAGE VALIDATION ================= */

  async verifyMarketplaceLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.filterPanel).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.appCards.first()).toBeVisible();

    console.log("✅ Marketplace loaded successfully");
  }

  /* ================= SEARCH ================= */

  async searchApp(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.page.keyboard.press('Enter');
  }

  async verifySearchResults(): Promise<void> {
    await expect(this.appCards.first()).toBeVisible();
  }

  async verifyNoResults(): Promise<void> {
    const noResults = this.page.locator('text=No results');
    await expect(noResults).toBeVisible();
  }

  /* ================= FILTER ================= */

  async openCategoryFilter(): Promise<void> {
    await this.categoryDropdown.click();
  }

  async openOrderFilter(): Promise<void> {
    await this.orderByDropdown.click();
  }

  /* ================= APP INTERACTION ================= */

  async openFirstApp(): Promise<void> {
    await this.appCards.first().click();
  }

  async clickExplore(): Promise<void> {
    await this.exploreButton.first().click();
  }

  /* ================= TRY LIVE ================= */

  async clickTryLive(): Promise<void> {
    await expect(this.tryLiveButton).toBeVisible({ timeout: 60000 });
    await this.tryLiveButton.click();

    await expect(this.chatInput).toBeVisible();
  }

  async sendMessage(message: string): Promise<void> {
    await this.chatInput.fill(message);
    await this.page.keyboard.press('Enter');
  }

  async verifyChatResponse(): Promise<void> {
    const response = this.page.locator('data-testid=chat-response');
    await expect(response).toBeVisible();
  }
}