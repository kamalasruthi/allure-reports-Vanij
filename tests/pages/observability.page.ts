import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class ObservabilityPage {
  page: Page;

  /* LOGIN */
  devModeButton: Locator;

  /* SIDEBAR */
  agentStudioMenu: Locator;
  observabilityMenu: Locator;

  /* TABS */
  projectsTab: Locator;
  manTab: Locator;
  compDepTab: Locator;

  /* PROJECT OBS */
  totalProjectsCard: Locator;
  totalFlowsCard: Locator;
  activeFlowsCard: Locator;
  inactiveFlowsCard: Locator;
  coinsUtilizationCard: Locator;
  customerTokenCard: Locator;
  projectUsageReport: Locator;
  myObservabilityTab: Locator;
  userObservabilityTab: Locator;

  /* MAN OBS */
  totalManProjects: Locator;
  inactiveManProjects: Locator;
  activeManProjects: Locator;
  manCoinsUtilization: Locator;
  manCustomerToken: Locator;
  manUsageReport: Locator;

  /* COMPONENT DEPLOYMENT */
  totalCustomComponents: Locator;
  totalActiveComponents: Locator;
  totalInactiveComponents: Locator;
  totalVersions: Locator;
  totalDeployedComponents: Locator;
  deploymentReadyComponents: Locator;

  /* FLOW DEPLOYMENT */
  deployedFlows: Locator;
  readyFlows: Locator;
  publishedFlows: Locator;
  runningFlows: Locator;
  stoppedFlows: Locator;

  /* MAN DEPLOYMENT */
  deployedManProjects: Locator;
  publishedManProjects: Locator;
  runningManProjects: Locator;
  stoppedManProjects: Locator;

  constructor(page: Page) {
    this.page = page;

    /* LOGIN */
    this.devModeButton =
      page.locator('button:has-text("Dev Mode")');

    /* SIDEBAR */
    this.agentStudioMenu =
      page.locator('text=Agent Studio').first();

    this.observabilityMenu =
      page.locator('text=Observability');

    /* TABS */
    this.projectsTab =
      page.locator('button:has-text("Projects")');

    this.manTab =
      page.locator('button:has-text("Multi Agent Network")');

    this.compDepTab =
      page.locator('button:has-text("Comp & Dep")');

    /* PROJECT */
    this.totalProjectsCard = page.locator('text=Total Projects');
    this.totalFlowsCard = page.locator('text=Total Flows');
    this.activeFlowsCard = page.locator('text=Total Active Flows');
    this.inactiveFlowsCard = page.locator('text=Total Inactive Flows');
    this.coinsUtilizationCard = page.locator('text=Coins Utilization');
    this.customerTokenCard = page.locator('text=Customer Token');
    this.projectUsageReport = page.locator('text=Projects Usage Report');
    this.myObservabilityTab = page.locator('button:has-text("My Observability")');
    this.userObservabilityTab = page.locator('button:has-text("Users Observability")');

    /* MAN */
    this.totalManProjects = page.locator('text=Total Projects');
    this.inactiveManProjects = page.locator('text=Inactive Projects');
    this.activeManProjects = page.locator('text=Active Projects');
    this.manCoinsUtilization = page.locator('text=Coins Utilization - MAN');
    this.manCustomerToken = page.locator('text=Customer Token - MAN');
    this.manUsageReport = page.locator('text=Multi Agent Network Usage Report');

    /* COMPONENT DEPLOYMENT */
    this.totalCustomComponents = page.locator('text=Total Custom Components');
    this.totalActiveComponents = page.locator('text=Total Active Components');
    this.totalInactiveComponents = page.locator('text=Total Inactive Components');
    this.totalVersions = page.locator('text=Total Versions');
    this.totalDeployedComponents = page.locator('text=Total Deployed Components');
    this.deploymentReadyComponents = page.locator('text=Deployment Ready Components');

    /* FLOW */
    this.deployedFlows = page.locator('text=Deployed Flows');
    this.readyFlows = page.locator('text=Deployment Ready Flows');
    this.publishedFlows = page.locator('text=Published Flows');
    this.runningFlows = page.locator('text=Running Flows');
    this.stoppedFlows = page.locator('text=Stopped Flows');

    /* MAN DEPLOYMENT */
    this.deployedManProjects = page.locator('text=Deployed Man Projects');
    this.publishedManProjects = page.locator('text=Published Man Projects');
    this.runningManProjects = page.locator('text=Running Man Projects');
    this.stoppedManProjects = page.locator('text=Stopped Man Projects');
  }

  /* ================= NAVIGATION ================= */

  async navigateToObservability(): Promise<void> {
    console.log("🌐 Opening SAI");

    await this.page.goto(`${process.env.BASE_URL}/sai`, {
      timeout: 120000
    });

    const login = new LoginPage(this.page);

    await login.loginWithPassword(
      process.env.USER_EMAIL as string,
      process.env.USER_PASSWORD as string
    );

    console.log("🚀 Clicking Dev Mode");

    await expect(this.devModeButton).toBeVisible({ timeout: 200000 });
    await this.devModeButton.click();

    console.log("📂 Opening Agent Studio");

    await expect(this.agentStudioMenu).toBeVisible({ timeout: 200000 });
    await this.agentStudioMenu.click();

    console.log("📊 Opening Observability");

    await expect(this.observabilityMenu).toBeVisible({ timeout: 200000 });
    await this.observabilityMenu.click();
  }

  /* ================= PROJECT OBS ================= */

  async verifyProjectsObservability(): Promise<void> {
    await expect(this.projectsTab).toBeVisible();
    await this.projectsTab.click();

    const elements = [
      this.totalProjectsCard,
      this.totalFlowsCard,
      this.activeFlowsCard,
      this.inactiveFlowsCard,
      this.coinsUtilizationCard,
      this.customerTokenCard,
      this.projectUsageReport,
      this.myObservabilityTab,
      this.userObservabilityTab
    ];

    for (const el of elements) {
      await expect(el).toBeVisible();
    }

    console.log("✅ Projects Observability verified");
  }

  /* ================= MAN OBS ================= */

  async verifyManObservability(): Promise<void> {
    await expect(this.manTab).toBeVisible();
    await this.manTab.click();

    const elements = [
      this.totalManProjects,
      this.inactiveManProjects,
      this.activeManProjects,
      this.manCoinsUtilization,
      this.manCustomerToken,
      this.manUsageReport
    ];

    for (const el of elements) {
      await expect(el).toBeVisible();
    }

    console.log("✅ MAN Observability verified");
  }

  /* ================= COMPONENT DEPLOYMENT ================= */

  async verifyComponentDeploymentObservability(): Promise<void> {
    await expect(this.compDepTab).toBeVisible();
    await this.compDepTab.click();

    const elements = [
      this.totalCustomComponents,
      this.totalActiveComponents,
      this.totalInactiveComponents,
      this.totalVersions,
      this.totalDeployedComponents,
      this.deploymentReadyComponents
    ];

    for (const el of elements) {
      await expect(el).toBeVisible();
    }

    console.log("✅ Component deployment observability verified");
  }

  /* ================= FLOW DEPLOYMENT ================= */

  async verifyFlowDeploymentObservability(): Promise<void> {
    const elements = [
      this.deployedFlows,
      this.readyFlows,
      this.publishedFlows,
      this.runningFlows,
      this.stoppedFlows
    ];

    for (const el of elements) {
      await expect(el).toBeVisible();
    }

    console.log("✅ Flow deployment observability verified");
  }

  /* ================= MAN DEPLOYMENT ================= */

  async verifyManDeploymentObservability(): Promise<void> {
    const elements = [
      this.deployedManProjects,
      this.publishedManProjects,
      this.runningManProjects,
      this.stoppedManProjects
    ];

    for (const el of elements) {
      await expect(el).toBeVisible();
    }

    console.log("✅ MAN deployment observability verified");
  }
}