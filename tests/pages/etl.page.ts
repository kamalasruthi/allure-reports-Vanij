import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class EtlPage {
  page: Page;

  /* LOGIN */
  loginButton: Locator;
  devModeButton: Locator;

  /* SIDEBAR */
  agentStudioMenu: Locator;
  etlMenu: Locator;

  /* SOURCE */
  createSourceBtn: Locator;
  fileSourceOption: Locator;
  nameInput: Locator;
  createBtn: Locator;

  /* DESTINATION */
  destinationTab: Locator;
  createDestinationBtn: Locator;
  postgresOption: Locator;
  hostInput: Locator;
  portInput: Locator;
  usernameInput: Locator;
  passwordInput: Locator;
  databaseInput: Locator;

  /* CONNECTION */
  connectionTab: Locator;
  createConnectionBtn: Locator;
  discoverSchemaBtn: Locator;
  continueBtn: Locator;
  configureConnectionBtn: Locator;
  enableToggle: Locator;
  connectionNameInput: Locator;
  createConnectionSubmitBtn: Locator;

  /* SYNC */
  syncBtn: Locator;
  timeline: Locator;

  /* ERROR */
  errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    /* LOGIN */
    this.loginButton =
      page.getByRole('button', { name: /login/i });

    this.devModeButton =
      page.getByRole('button', { name: /dev mode/i });

    /* SIDEBAR */
    this.agentStudioMenu =
      page.getByText('Agent Studio').first();

    this.etlMenu =
      page.getByText('ETL').first();

    /* SOURCE */
    this.createSourceBtn =
      page.getByRole('button', { name: /create source/i });

    this.fileSourceOption =
      page.getByText('File').first();

    this.nameInput =
      page.getByPlaceholder(/name/i);

    this.createBtn =
      page.getByRole('button', { name: /^create$/i });

    /* DESTINATION */
    this.destinationTab =
      page.getByText('Destination');

    this.createDestinationBtn =
      page.getByRole('button', { name: /create destination/i });

    this.postgresOption =
      page.getByText('Postgres').first();

    this.hostInput =
      page.getByPlaceholder(/host/i);

    this.portInput =
      page.getByPlaceholder(/port/i);

    this.usernameInput =
      page.getByPlaceholder(/username/i);

    this.passwordInput =
      page.getByPlaceholder(/password/i);

    this.databaseInput =
      page.getByPlaceholder(/database/i);

    /* CONNECTION */
    this.connectionTab =
      page.getByText('Connection');

    this.createConnectionBtn =
      page.getByRole('button', { name: /create connection/i });

    this.discoverSchemaBtn =
      page.getByRole('button', { name: /discover schema/i });

    this.continueBtn =
      page.getByRole('button', { name: /continue/i });

    this.configureConnectionBtn =
      page.getByRole('button', { name: /configure connection/i });

    this.enableToggle =
      page.getByText('Enable');

    this.connectionNameInput =
      page.getByPlaceholder(/connection name/i);

    this.createConnectionSubmitBtn =
      page.getByRole('button', { name: /create connection/i });

    /* SYNC */
    this.syncBtn =
      page.getByRole('button', { name: /sync/i });

    this.timeline =
      page.getByText('Timeline');

    /* ERROR */
    this.errorMessage =
      page.locator('text=/error/i');
  }

  /* ===================================================== */
  /* NAVIGATION */
  /* ===================================================== */

  async navigateToEtl(): Promise<void> {
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

    /* AGENT STUDIO */
    console.log("📂 Opening Agent Studio");

    await this.agentStudioMenu.waitFor({
      state: 'visible',
      timeout: 120000
    });

    await this.agentStudioMenu.click();

    /* ETL */
    console.log("🔄 Opening ETL");

    await this.etlMenu.waitFor({
      state: 'visible',
      timeout: 120000
    });

    await this.etlMenu.click();

    /* VERIFY */
    await this.createSourceBtn.waitFor({
      state: 'visible',
      timeout: 120000
    });

    console.log("✅ ETL page loaded");
  }

  /* ===================================================== */
  /* CREATE SOURCE */
  /* ===================================================== */

  async createSource(): Promise<void> {
    const sourceName = `AutoSource-${Date.now()}`;

    console.log("➕ Creating Source");

    await this.createSourceBtn.click();
    await this.fileSourceOption.click();
    await this.nameInput.fill(sourceName);
    await this.createBtn.click();

    await expect(
      this.page.getByText(sourceName)
    ).toBeVisible({ timeout: 120000 });

    console.log("✅ Source created");
  }

  /* ===================================================== */
  /* CREATE DESTINATION */
  /* ===================================================== */

  async createDestination(valid: boolean = true): Promise<void> {
    console.log("➕ Creating Destination");

    await this.destinationTab.click();
    await this.createDestinationBtn.click();
    await this.postgresOption.click();

    await this.nameInput.fill(`AutoDest-${Date.now()}`);
    await this.hostInput.fill('localhost');
    await this.portInput.fill(valid ? '5432' : '9999');
    await this.usernameInput.fill('postgres');
    await this.passwordInput.fill('password');
    await this.databaseInput.fill('postgres');

    await this.createBtn.click();

    if (!valid) {
      await expect(this.errorMessage).toBeVisible();
      console.log("❌ Negative test passed");
    } else {
      console.log("✅ Destination created");
    }
  }

  /* ===================================================== */
  /* CREATE CONNECTION */
  /* ===================================================== */

  async createConnection(): Promise<void> {
    console.log("🔗 Creating Connection");

    await this.connectionTab.click();
    await this.createConnectionBtn.click();

    await this.page.locator('table tr').first().click();
    await this.discoverSchemaBtn.click();
    await this.continueBtn.click();

    await this.page.locator('table tr').nth(1).click();
    await this.configureConnectionBtn.click();

    await this.enableToggle.click();

    const connectionName = `AutoConnection-${Date.now()}`;

    await this.connectionNameInput.fill(connectionName);
    await this.createConnectionSubmitBtn.click();

    await expect(
      this.page.getByText(connectionName)
    ).toBeVisible({ timeout: 120000 });

    console.log("✅ Connection created");
  }

  /* ===================================================== */
  /* SYNC */
  /* ===================================================== */

  async performSync(): Promise<void> {
    console.log("🔄 Performing Sync");

    await this.syncBtn.click();

    await expect(this.timeline).toBeVisible({
      timeout: 120000
    });

    console.log("✅ Sync completed");
  }
}