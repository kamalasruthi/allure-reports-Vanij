import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class FlowDeploymentPage {

  readonly page: Page;

  /* LOGIN */
  readonly loginButton: Locator;

  /* DEV MODE */
  readonly devModeButton: Locator;

  /* SIDEBARS */
  readonly iconSidebar: Locator;
  readonly textSidebar: Locator;

  /* MENUS */
  readonly agentStudioIcon: Locator;
  readonly flowDeploymentMenu: Locator;

  /* FLOW DEPLOYMENT PAGE */
  readonly flowDeploymentHeading: Locator;
  readonly productionFilter: Locator;
  readonly uatFilter: Locator;
  readonly allProjectsTab: Locator;
  readonly projectCard: Locator;
  readonly flowCheckbox: Locator;
  readonly deployButton: Locator;

  /* DEPLOYMENT FORM */
  readonly infraTypeDropdown: Locator;
  readonly vmOption: Locator;
  readonly clusterOption: Locator;
  readonly vmNameInput: Locator;
  readonly microserviceNameInput: Locator;
  readonly saveButton: Locator;

  /* DEPLOYMENT STATUS */
  readonly deploymentStatus: Locator;

  constructor(page: Page) {

    this.page = page;

    /* LOGIN */
    this.loginButton = page.getByRole('button', { name: /login/i });

    /* DEV MODE */
    this.devModeButton = page.getByRole('button', { name: /dev mode/i });

    /* SIDEBARS */
    this.iconSidebar = page.locator('aside').first();
    this.textSidebar = page.locator('aside').nth(1);

    /* MENUS */
    this.agentStudioIcon = this.iconSidebar;
    this.flowDeploymentMenu = page.getByText(/flow deployment/i);

    /* FLOW DEPLOYMENT PAGE */
    this.flowDeploymentHeading = page.getByText(/flow deployment/i);
    this.productionFilter = page.getByText('Production');
    this.uatFilter = page.getByText('UAT');
    this.allProjectsTab = page.getByText(/all projects/i);
    this.projectCard = page.locator('[data-testid]').first();
    this.flowCheckbox = page.locator('input[type="checkbox"]').first();
    this.deployButton = page.getByRole('button', { name: /deploy/i });

    /* DEPLOYMENT FORM */
    this.infraTypeDropdown = page.getByLabel(/infra type/i);
    this.vmOption = page.getByText(/virtual machine/i);
    this.clusterOption = page.getByText(/cluster/i);
    this.vmNameInput = page.getByPlaceholder(/virtual machine name/i);
    this.microserviceNameInput = page.getByPlaceholder(/microservice name/i);
    this.saveButton = page.getByRole('button', { name: /save/i });

    /* DEPLOYMENT STATUS */
    this.deploymentStatus = page.getByText(/running|setup in progress/i);

  }

  /* -------------------------------- */
  /* NAVIGATE TO FLOW DEPLOYMENT */
  /* -------------------------------- */

  async navigateToFlowDeployment(): Promise<void> {

    console.log("🌐 Opening Vanij SAI");

    await this.page.goto(`${process.env.BASE_URL}/sai`, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    });

    console.log("🔐 Logging in");

    const login = new LoginPage(this.page);

    await login.loginWithPassword(
      process.env.USER_EMAIL as string,
      process.env.USER_PASSWORD as string
    );

    await this.page.waitForLoadState('networkidle');

    console.log("✅ Login successful");

    await this.page.waitForTimeout(120000);

    /* CLICK DEV MODE */

    console.log("🚀 Clicking Dev Mode");

    await this.page.locator('button:has-text("Dev Mode")').click();

    await this.page.waitForTimeout(3000);

    /* OPEN AGENT STUDIO */

    console.log("📂 Opening Agent Studio");

    await this.agentStudioIcon.click();

    await this.page.waitForTimeout(3000);

    /* OPEN FLOW DEPLOYMENT */

    console.log("📦 Opening Flow Deployment");

    await this.flowDeploymentMenu.click();

    await expect(this.flowDeploymentHeading).toBeVisible({
      timeout: 120000
    });

    console.log("✅ Flow Deployment page opened");

  }

  /* -------------------------------- */
  /* SWITCH ENVIRONMENT */
  /* -------------------------------- */

  async selectProductionEnvironment(): Promise<void> {

    console.log("Switching to Production");

    await this.productionFilter.click();

  }

  async selectUATEnvironment(): Promise<void> {

    console.log("Switching to UAT");

    await this.uatFilter.click();

  }

  /* -------------------------------- */
  /* SELECT PROJECT AND FLOW */
  /* -------------------------------- */

  async selectProjectAndFlow(): Promise<void> {

    console.log("Selecting project");

    await this.projectCard.click();

    await this.flowCheckbox.click();

    console.log("Flow selected");

  }

  /* -------------------------------- */
  /* DEPLOY FLOW */
  /* -------------------------------- */

  async deployFlow(): Promise<void> {

    console.log("Click Deploy");

    await this.deployButton.click();

    await expect(this.infraTypeDropdown).toBeVisible();

    await this.infraTypeDropdown.click();

    await this.vmOption.click();

    await this.vmNameInput.fill(`vm-${Date.now()}`);

    await this.microserviceNameInput.fill(`micro-${Date.now()}`);

    await this.saveButton.click();

    console.log("✅ Deployment started");

  }

  /* -------------------------------- */
  /* VERIFY DEPLOYMENT STATUS */
  /* -------------------------------- */

  async verifyDeploymentStarted(): Promise<void> {

    await expect(this.deploymentStatus).toBeVisible({
      timeout: 120000
    });

    console.log("✅ Deployment status verified");

  }

}