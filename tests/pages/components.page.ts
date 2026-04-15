import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class ComponentsPage {
  page: Page;

  /* LOGIN */
  loginButton: Locator;

  /* DEV MODE */
  devModeButton: Locator;

  /* SIDEBAR */
  leftIconSidebar: Locator;
  agentStudioIcon: Locator;

  /* MENU */
  componentsMenu: Locator;

  /* PAGE */
  componentsHeading: Locator;
  searchBox: Locator;

  /* CATEGORIES */
  inputsCategory: Locator;
  outputsCategory: Locator;
  promptsCategory: Locator;
  dataCategory: Locator;
  connectorsCategory: Locator;
  modelsCategory: Locator;
  toolsCategory: Locator;
  helpersCategory: Locator;
  emailSmsCategory: Locator;
  parsersCategory: Locator;
  mcpClientsCategory: Locator;
  mcpServersCategory: Locator;

  constructor(page: Page) {
    this.page = page;

    /* LOGIN */
    this.loginButton =
      page.getByRole('button', { name: /login/i });

    /* DEV MODE */
    this.devModeButton =
      page.getByRole('button', { name: /dev mode/i });

    /* SIDEBAR */
    this.leftIconSidebar =
      page.locator('aside').first();

    this.agentStudioIcon =
      this.leftIconSidebar.locator('svg').nth(1);

    /* MENU */
    this.componentsMenu =
      page.getByText('Components', { exact: true });

    /* PAGE */
    this.componentsHeading =
      page.getByRole('heading', { name: /components/i });

    this.searchBox =
      page.getByPlaceholder(/search/i);

    /* CATEGORIES */
    this.inputsCategory = page.getByText('Inputs', { exact: true });
    this.outputsCategory = page.getByText('Outputs', { exact: true });
    this.promptsCategory = page.getByText('Prompts', { exact: true });
    this.dataCategory = page.getByText('Data', { exact: true });
    this.connectorsCategory = page.getByText('Connectors', { exact: true });
    this.modelsCategory = page.getByText('Models', { exact: true });
    this.toolsCategory = page.getByText('Tools', { exact: true });
    this.helpersCategory = page.getByText('Helpers', { exact: true });
    this.emailSmsCategory = page.getByText('Email & SMS', { exact: true });
    this.parsersCategory = page.getByText('Parsers', { exact: true });
    this.mcpClientsCategory = page.getByText('MCP Clients', { exact: true });
    this.mcpServersCategory = page.getByText('MCP Servers', { exact: true });
  }

  /* ================================= */
  /* NAVIGATION */
  /* ================================= */

  async navigateToComponents(): Promise<void> {
    console.log("🌐 Opening SAI page");

    await this.page.goto(`${process.env.BASE_URL}/sai`, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    });

    /* LOGIN */
    await expect(this.loginButton).toBeVisible({
      timeout: 120000
    });

    const login = new LoginPage(this.page);

    console.log("🔐 Performing login...");

    await login.loginWithPassword(
      process.env.USER_EMAIL as string,
      process.env.USER_PASSWORD as string
    );

    /* WAIT FOR DASHBOARD */
    await this.page.waitForURL('**/sai', {
      timeout: 120000
    });

    /* DEV MODE */
    console.log("🚀 Clicking Dev Mode");

    await expect(this.devModeButton).toBeVisible({
      timeout: 120000
    });

    await this.devModeButton.click();

    /* WAIT DASHBOARD LOAD */
    await this.page.waitForURL(/dashboard/, {
      timeout: 120000
    });

    /* SIDEBAR */
    await expect(this.leftIconSidebar).toBeVisible({
      timeout: 120000
    });

    /* AGENT STUDIO */
    console.log("📂 Clicking Agent Studio icon");

    await this.agentStudioIcon.click();

    /* COMPONENTS */
    console.log("🧩 Opening Components");

    await expect(this.componentsMenu).toBeVisible({
      timeout: 120000
    });

    await this.componentsMenu.click();

    /* VERIFY PAGE */
    await expect(this.componentsHeading).toBeVisible({
      timeout: 120000
    });

    await expect(this.searchBox).toBeVisible({
      timeout: 120000
    });

    console.log("✅ Components page opened successfully");
  }

  /* ================================= */
  /* VERIFY COMPONENTS */
  /* ================================= */

  async verifyComponentsVisible(): Promise<void> {
    console.log("🔍 Verifying component categories");

    await expect(this.inputsCategory).toBeVisible();
    await expect(this.outputsCategory).toBeVisible();
    await expect(this.promptsCategory).toBeVisible();
    await expect(this.dataCategory).toBeVisible();
    await expect(this.connectorsCategory).toBeVisible();
    await expect(this.modelsCategory).toBeVisible();
    await expect(this.toolsCategory).toBeVisible();
    await expect(this.helpersCategory).toBeVisible();
    await expect(this.emailSmsCategory).toBeVisible();
    await expect(this.parsersCategory).toBeVisible();
    await expect(this.mcpClientsCategory).toBeVisible();
    await expect(this.mcpServersCategory).toBeVisible();

    console.log("🎉 All components are visible");
  }
}