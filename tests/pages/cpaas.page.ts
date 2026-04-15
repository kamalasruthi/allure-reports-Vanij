import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class CpaasPage {

  private page: Page;

  /* ================= LOCATORS ================= */

  private loginButton: Locator;
  private devModeButton: Locator;

  private agentStudioMenu: Locator;
  private cpaasMenu: Locator;

  private startNowBtn: Locator;

  private createProviderBtn: Locator;
  private providerNameInput: Locator;
  private apiKeyInput: Locator;
  private saveConfigBtn: Locator;
  private providerList: Locator;
  private editConfigBtn: Locator;
  private testConnectionBtn: Locator;
  private phoneInput: Locator;
  private messageInput: Locator;
  private sendTestMessageBtn: Locator;
  private activeStatus: Locator;

  private createTemplateBtn: Locator;
  private templateNameInput: Locator;
  private templateContentInput: Locator;
  private addVariableBtn: Locator;
  private saveTemplateBtn: Locator;

  private dashboardHeader: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginButton = page.getByRole('button', { name: /login/i });
    this.devModeButton = page.getByRole('button', { name: /dev mode/i });

    this.agentStudioMenu = page.getByText('Agent Studio').first();
    this.cpaasMenu = page.getByText('CPAAS').first();

    this.startNowBtn = page.getByRole('button', { name: /start now/i });

    this.createProviderBtn = page.getByRole('button', { name: /create provider/i });
    this.providerNameInput = page.getByPlaceholder(/provider name/i);
    this.apiKeyInput = page.getByPlaceholder(/api key/i);
    this.saveConfigBtn = page.getByRole('button', { name: /save configuration/i });
    this.providerList = page.locator('table');
    this.editConfigBtn = page.getByRole('button', { name: /edit configuration/i });
    this.testConnectionBtn = page.getByRole('button', { name: /test connection/i });
    this.phoneInput = page.getByPlaceholder(/phone/i);
    this.messageInput = page.getByPlaceholder(/message/i);
    this.sendTestMessageBtn = page.getByRole('button', { name: /send test message/i });
    this.activeStatus = page.getByText('ACTIVE');

    this.createTemplateBtn = page.getByRole('button', { name: /create templates/i });
    this.templateNameInput = page.getByPlaceholder(/template name/i);
    this.templateContentInput = page.getByPlaceholder(/template content/i);
    this.addVariableBtn = page.getByRole('button', { name: /add variable/i });
    this.saveTemplateBtn = page.getByRole('button', { name: /save/i });

    this.dashboardHeader = page.getByText('Dashboard');
    this.errorMessage = page.locator('text=/error/i');
  }

  /* ===================================================== */
  /* LOGIN + NAVIGATION */
  /* ===================================================== */

  async navigateToCpaas(): Promise<void> {

    console.log("🌐 Opening SAI");

    await this.page.goto(`${process.env.BASE_URL}/sai`, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    });

    console.log("🔐 Performing login");

    const login = new LoginPage(this.page);

    await login.loginWithPassword(
      process.env.USER_EMAIL as string,
      process.env.USER_PASSWORD as string
    );

    console.log("✅ Login successful");

    console.log("🚀 Clicking Dev Mode");

    await this.devModeButton.waitFor({ timeout: 120000 });
    await this.devModeButton.click();

    console.log("📂 Opening Agent Studio");

    await this.agentStudioMenu.waitFor({ timeout: 120000 });
    await this.agentStudioMenu.click();

    console.log("📞 Opening CPAAS");

    await this.cpaasMenu.waitFor({ timeout: 120000 });
    await this.cpaasMenu.click();

    await this.startNowBtn.waitFor({ timeout: 120000 });
    await this.startNowBtn.click();

    console.log("✅ CPAAS Loaded");
  }

  /* ===================================================== */
  /* CREATE PROVIDER */
  /* ===================================================== */

  async createProvider(valid: boolean = true): Promise<void> {

    console.log("➕ Creating Provider");

    await this.createProviderBtn.click();

    const providerName = `AutoProvider-${Date.now()}`;

    await this.providerNameInput.fill(providerName);
    await this.apiKeyInput.fill(valid ? 'VALID_API_KEY' : '');

    await this.saveConfigBtn.click();

    if (!valid) {
      await expect(this.errorMessage).toBeVisible();
      console.log("❌ Negative test passed (missing API key)");
    } else {
      await expect(this.page.getByText(providerName))
        .toBeVisible({ timeout: 120000 });

      console.log("✅ Provider created");
    }
  }

  /* ===================================================== */
  /* EDIT PROVIDER */
  /* ===================================================== */

  async editProvider(): Promise<void> {

    console.log("✏ Editing Provider");

    await this.page.locator('table tr').first().click();
    await this.editConfigBtn.click();

    await this.apiKeyInput.fill('UPDATED_API_KEY');
    await this.saveConfigBtn.click();

    console.log("✅ Provider edited");
  }

  /* ===================================================== */
  /* TEST CONNECTION */
  /* ===================================================== */

  async testProviderConnection(): Promise<void> {

    console.log("🔄 Testing Provider");

    await this.testConnectionBtn.click();

    await this.phoneInput.fill('9876543210');
    await this.messageInput.fill('Test Message');

    await this.sendTestMessageBtn.click();

    await expect(this.activeStatus)
      .toBeVisible({ timeout: 120000 });

    console.log("✅ Provider is ACTIVE");
  }

  /* ===================================================== */
  /* CREATE TEMPLATE */
  /* ===================================================== */

  async createTemplate(): Promise<void> {

    console.log("📝 Creating Template");

    await this.createTemplateBtn.click();

    const templateName = `AutoTemplate-${Date.now()}`;

    await this.templateNameInput.fill(templateName);
    await this.templateContentInput.fill("Hello {{name}}");

    if (await this.addVariableBtn.isVisible().catch(() => false)) {
      await this.addVariableBtn.click();
    }

    await this.saveTemplateBtn.click();

    await expect(this.page.getByText(templateName))
      .toBeVisible({ timeout: 120000 });

    console.log("✅ Template created");
  }

  /* ===================================================== */
  /* VERIFY DASHBOARD */
  /* ===================================================== */

  async verifyDashboard(): Promise<void> {

    await expect(this.dashboardHeader)
      .toBeVisible({ timeout: 120000 });

    console.log("✅ Dashboard Verified");
  }
}