import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class ManPage {
  page: Page;

  /* LOGIN */
  loginButton: Locator;

  /* DEV MODE */
  devModeButton: Locator;

  /* SIDEBARS */
  iconSidebar: Locator;
  textSidebar: Locator;

  /* MENUS */
  agentStudioIcon: Locator;
  multiAgentNetworkMenu: Locator;

  /* MAN PAGE ELEMENTS */
  manHeading: Locator;
  createNewButton: Locator;
  chatInput: Locator;
  quickViewButton: Locator;
  cloneButton: Locator;
  manCard: Locator;

  constructor(page: Page) {
    this.page = page;

    /* LOGIN */
    this.loginButton =
      page.getByRole('button', { name: /login/i });

    /* DEV MODE */
    this.devModeButton =
      page.getByRole('button', { name: /dev mode/i });

    /* SIDEBARS */
    this.iconSidebar =
      page.locator('aside').first();

    this.textSidebar =
      page.locator('aside').nth(1);

    /* MENUS */
    this.agentStudioIcon =
      page.locator('aside').first();

    this.multiAgentNetworkMenu =
      page.getByText(/multi-agent network/i);

    /* MAN PAGE ELEMENTS */
    this.manHeading =
      page.getByText(/multi-agent network/i);

    this.createNewButton =
      page.getByRole('button', { name: /create new/i });

    this.chatInput =
      page.locator('textarea, input').first();

    this.quickViewButton =
      page.getByRole('button', { name: /quick view/i }).first();

    this.cloneButton =
      page.getByRole('button', { name: /clone/i }).first();

    this.manCard =
      page.locator('[data-testid]').first();
  }

  /* -------------------------------- */
  /* NAVIGATION */
  /* -------------------------------- */

  async navigateToMan(): Promise<void> {
    console.log("🌐 Opening Vanij SAI");

    await this.page.goto(`${process.env.BASE_URL}/sai`, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    });

    /* LOGIN */
    console.log("🔐 Performing login");

    const login = new LoginPage(this.page);

    await login.loginWithPassword(
      process.env.USER_EMAIL as string,
      process.env.USER_PASSWORD as string,
      { timeout: 120000 }
    );

    /* CLICK DEV MODE */
    console.log("🚀 Clicking Dev Mode");

    await this.page.waitForSelector('button:has-text("Dev Mode")', {
      timeout: 120000
    });

    await this.page.locator('button:has-text("Dev Mode")').click();

    /* WAIT FOR ICON SIDEBAR */
    await this.page.waitForTimeout(120000);

    /* CLICK AGENT STUDIO ICON */
    console.log("📂 Opening Agent Studio");

    await this.iconSidebar.click();
    await this.page.waitForTimeout(120000);

    /* WAIT FOR TEXT SIDEBAR */
    await this.page.waitForTimeout(120000);

    /* CLICK MULTI AGENT NETWORK */
    console.log("🤖 Opening Multi-Agent Network");

    await this.multiAgentNetworkMenu.click();
    await this.page.waitForTimeout(120000);

    /* VERIFY PAGE */
    await expect(this.manHeading).toBeVisible({
      timeout: 120000
    });

    console.log("✅ MAN page opened successfully");
  }

  /* -------------------------------- */
  /* VERIFY PAGE */
  /* -------------------------------- */

  async verifyManPageLoaded(): Promise<void> {
    await expect(this.manHeading).toBeVisible({
      timeout: 120000
    });
  }

  /* -------------------------------- */
  /* CREATE MAN */
  /* -------------------------------- */

  async createNewMan(): Promise<void> {
    console.log("➕ Creating new MAN");

    await expect(this.createNewButton).toBeVisible({
      timeout: 120000
    });

    await this.createNewButton.click();

    await this.page.waitForTimeout(120000);

    await expect(this.chatInput).toBeVisible({
      timeout: 120000
    });

    await this.chatInput.fill("Automation Test MAN");

    await this.page.keyboard.press('Enter');

    console.log("✅ MAN created successfully");
  }

  /* -------------------------------- */
  /* CLONE MAN */
  /* -------------------------------- */

  async cloneManProject(): Promise<void> {
    console.log("📄 Cloning MAN");

    await expect(this.quickViewButton).toBeVisible({
      timeout: 120000
    });

    await this.quickViewButton.click();

    await expect(this.cloneButton).toBeVisible({
      timeout: 120000
    });

    await this.cloneButton.click();

    console.log("✅ MAN cloned successfully");
  }

  /* -------------------------------- */
  /* OPEN EXISTING MAN */
  /* -------------------------------- */

  async openExistingMan(): Promise<void> {
    console.log("📂 Opening existing MAN");

    await expect(this.manCard).toBeVisible({
      timeout: 120000
    });

    await this.manCard.click();

    console.log("✅ MAN opened successfully");
  }
}