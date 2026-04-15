import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class ManDeploymentPage {
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
  manMenu: Locator;

  /* MAN PAGE */
  manHeading: Locator;
  manProjectCard: Locator;

  /* DEPLOY */
  deployButton: Locator;

  /* DEPLOY FORM */
  environmentDropdown: Locator;
  devEnvironmentOption: Locator;
  infraTypeDropdown: Locator;
  vmOption: Locator;
  clusterOption: Locator;
  microserviceNameInput: Locator;
  saveButton: Locator;

  /* DEPLOYMENT STATUS */
  deploymentStatus: Locator;

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
      this.iconSidebar.locator('a,button').nth(1);

    this.manMenu =
      page.getByText(/multi-agent network/i).first();

    /* MAN PAGE */
    this.manHeading =
      page.getByText(/multi-agent network/i);

    this.manProjectCard =
      page.locator('[data-testid], .cursor-pointer').first();

    /* DEPLOY */
    this.deployButton =
      page.getByRole('button', { name: /deploy/i });

    /* DEPLOY FORM */
    this.environmentDropdown =
      page.locator('[role="combobox"]').first();

    this.devEnvironmentOption =
      page.getByText(/dev/i).first();

    this.infraTypeDropdown =
      page.locator('[role="combobox"]').nth(1);

    this.vmOption =
      page.getByText(/virtual machine/i);

    this.clusterOption =
      page.getByText(/cluster/i);

    this.microserviceNameInput =
      page.getByPlaceholder(/microservice name/i);

    this.saveButton =
      page.getByRole('button', { name: /save/i });

    /* DEPLOYMENT STATUS */
    this.deploymentStatus =
      page.getByText(/running|deploying|setup in progress/i);
  }

  /* -------------------------------- */
  /* NAVIGATE TO MAN PAGE */
  /* -------------------------------- */

  async navigateToManDeployment(): Promise<void> {
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
      process.env.USER_PASSWORD as string
    );

    console.log("✅ Login successful");

    /* WAIT FOR DEV MODE */
    console.log("⏳ Waiting for Dev Mode");

    await this.page.waitForLoadState('networkidle');

    await expect(this.devModeButton).toBeVisible({
      timeout: 120000
    });

    /* CLICK DEV MODE */
    console.log("🚀 Clicking Dev Mode");

    await this.devModeButton.click();

    /* WAIT FOR SIDEBAR */
    await expect(this.iconSidebar).toBeVisible({
      timeout: 120000
    });

    /* CLICK AGENT STUDIO */
    console.log("📂 Opening Agent Studio");

    await this.agentStudioIcon.click();

    /* WAIT FOR TEXT SIDEBAR */
    await expect(this.textSidebar).toBeVisible({
      timeout: 120000
    });

    /* CLICK MULTI AGENT NETWORK */
    console.log("🤖 Opening Multi-Agent Network");

    await expect(this.manMenu).toBeVisible({
      timeout: 120000
    });

    await this.manMenu.click();

    /* VERIFY PAGE */
    await expect(this.manHeading).toBeVisible({
      timeout: 120000
    });

    console.log("✅ MAN page opened successfully");
  }

  /* -------------------------------- */
  /* OPEN MAN PROJECT */
  /* -------------------------------- */

  async openManProject(): Promise<void> {
    console.log("📂 Opening MAN Project");

    await expect(this.manProjectCard).toBeVisible({
      timeout: 120000
    });

    await this.manProjectCard.click();

    console.log("✅ MAN Project opened");
  }

  /* -------------------------------- */
  /* DEPLOY MAN */
  /* -------------------------------- */

  async deployMan(): Promise<void> {
    console.log("🚀 Starting MAN deployment");

    await expect(this.deployButton).toBeVisible({
      timeout: 120000
    });

    await this.deployButton.click();

    /* SELECT ENVIRONMENT */
    if (await this.environmentDropdown.isVisible().catch(() => false)) {
      await this.environmentDropdown.click();
      await this.devEnvironmentOption.click();
    }

    /* SELECT INFRA TYPE */
    if (await this.infraTypeDropdown.isVisible().catch(() => false)) {
      await this.infraTypeDropdown.click();
      await this.vmOption.click();
    }

    /* ENTER MICROSERVICE NAME */
    if (await this.microserviceNameInput.isVisible().catch(() => false)) {
      await this.microserviceNameInput.fill(
        `man-microservice-${Date.now()}`
      );
    }

    /* SAVE */
    await expect(this.saveButton).toBeVisible({
      timeout: 120000
    });

    await this.saveButton.click();

    console.log("✅ MAN deployment initiated");
  }

  /* -------------------------------- */
  /* VERIFY DEPLOYMENT STATUS */
  /* -------------------------------- */

  async verifyDeploymentStatus(): Promise<void> {
    await expect(this.deploymentStatus).toBeVisible({
      timeout: 120000
    });

    console.log("✅ MAN deployment status verified");
  }
}