import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class AgpPage {
  page: Page;

  /* LOGIN */
  loginButton: Locator;
  devModeButton: Locator;

  /* SIDEBAR MENUS */
  agentStudioMenu: Locator;
  agpMenu: Locator;

  /* AGP PAGE */
  createRuleButton: Locator;

  /* FORM */
  ruleNameInput: Locator;
  ruleDescriptionInput: Locator;
  geoScopeDropdown: Locator;
  subGeoScopeDropdown: Locator;
  fileUploadInput: Locator;
  createRuleSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    /* LOGIN */
    this.loginButton =
      page.getByRole('button', { name: /login/i });

    this.devModeButton =
      page.getByRole('button', { name: /dev mode/i });

    /* SIDEBAR MENUS */
    this.agentStudioMenu =
      page.getByText('Agent Studio').first();

    this.agpMenu =
      page.getByText('AGP').first();

    /* AGP PAGE */
    this.createRuleButton =
      page.getByRole('button', { name: /create new rule/i });

    /* FORM */
    this.ruleNameInput =
      page.getByPlaceholder(/rule name/i);

    this.ruleDescriptionInput =
      page.getByPlaceholder(/rule description/i);

    this.geoScopeDropdown =
      page.locator('[role="combobox"]').first();

    this.subGeoScopeDropdown =
      page.locator('[role="combobox"]').nth(1);

    this.fileUploadInput =
      page.locator('input[type="file"]');

    this.createRuleSubmitButton =
      page.getByRole('button', { name: /create rule/i });
  }

  /* ================================= */
  /* NAVIGATION */
  /* ================================= */

  async navigateToAgp(): Promise<void> {
    console.log("🌐 Opening SAI");

    await this.page.goto(`${process.env.BASE_URL}/sai`, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    });

    /* LOGIN */
    console.log("🔐 Performing login");

    const login = new LoginPage(this.page);

    await login.loginWithPassword(
      process.env.USER_EMAIL as string,
      process.env.USER_PASSWORD as string
    );

    console.log("✅ Login successful");

    /* DEV MODE */
    console.log("🚀 Clicking Dev Mode");

    await this.devModeButton.waitFor({
      state: 'visible',
      timeout: 120000
    });

    await this.devModeButton.click();

    /* WAIT FOR AGENT STUDIO */
    await this.agentStudioMenu.waitFor({
      state: 'visible',
      timeout: 120000
    });

    /* CLICK AGENT STUDIO */
    console.log("📂 Opening Agent Studio");

    await this.agentStudioMenu.click();

    /* WAIT FOR AGP MENU */
    await this.agpMenu.waitFor({
      state: 'visible',
      timeout: 120000
    });

    /* CLICK AGP */
    console.log("📊 Opening AGP");

    await this.agpMenu.click();

    /* VERIFY PAGE */
    await this.createRuleButton.waitFor({
      state: 'visible',
      timeout: 120000
    });

    console.log("✅ AGP page opened successfully");
  }

  /* ================================= */
  /* CREATE RULE */
  /* ================================= */

  async createRule(): Promise<void> {
    console.log("➕ Creating AGP Rule");

    const ruleName =
      `Automation Rule ${Date.now()}`;

    await this.createRuleButton.click();

    await this.ruleNameInput.waitFor({
      state: 'visible',
      timeout: 60000
    });

    await this.ruleNameInput.fill(ruleName);

    await this.ruleDescriptionInput.fill(
      "Automation AGP Rule Description"
    );

    /* GEO */
    if (await this.geoScopeDropdown.isVisible().catch(() => false)) {
      await this.geoScopeDropdown.click();
      await this.page.locator('[role="option"]').first().click();
    }

    /* SUB GEO */
    if (await this.subGeoScopeDropdown.isVisible().catch(() => false)) {
      await this.subGeoScopeDropdown.click();
      await this.page.locator('[role="option"]').first().click();
    }

    /* FILE UPLOAD */
    await this.fileUploadInput.setInputFiles(
      'tests/fixtures/sample.csv'
    );

    /* SUBMIT */
    await this.createRuleSubmitButton.click();

    /* VERIFY */
    await expect(
      this.page.getByText(ruleName)
    ).toBeVisible({
      timeout: 120000
    });

    console.log("✅ AGP Rule created successfully");
  }
}