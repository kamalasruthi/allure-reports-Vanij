import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class OverviewPage {
  page: Page;

  /* LOGIN */
  loginButton: Locator;

  /* SAI DASHBOARD */
  devModeButton: Locator;

  /* SIDEBAR */
  agentStudioMenu: Locator;
  overviewMenu: Locator;

  /* AGENT STUDIO PAGE */
  multiAgentNetworkHeading: Locator;

  /* OVERVIEW WIDGETS */
  totalProjects: Locator;
  totalFlows: Locator;
  totalUsers: Locator;
  storageUsage: Locator;
  deployedFlows: Locator;
  deployedComponents: Locator;
  totalTickets: Locator;
  pendingTickets: Locator;
  resolvedTickets: Locator;
  closedTickets: Locator;

  constructor(page: Page) {
    this.page = page;

    /* LOGIN */
    this.loginButton =
      page.getByRole('button', { name: /login/i });

    /* SAI DASHBOARD */
    this.devModeButton =
      page.getByRole('button', { name: /dev mode/i });

    /* SIDEBAR */
    this.agentStudioMenu =
      page.getByText('Agent Studio', { exact: true }).first();

    this.overviewMenu =
      page.getByText('Overview', { exact: true }).first();

    /* AGENT STUDIO PAGE */
    this.multiAgentNetworkHeading =
      page.getByText(/multi agent network/i);

    /* OVERVIEW WIDGETS */
    this.totalProjects = page.getByText(/total projects/i);
    this.totalFlows = page.getByText(/total flows/i);
    this.totalUsers = page.getByText(/total users/i);
    this.storageUsage = page.getByText(/storage/i);
    this.deployedFlows = page.getByText(/deployed flows/i);
    this.deployedComponents = page.getByText(/deployed components/i);
    this.totalTickets = page.getByText(/total tickets/i);
    this.pendingTickets = page.getByText(/pending tickets/i);
    this.resolvedTickets = page.getByText(/resolved tickets/i);
    this.closedTickets = page.getByText(/closed tickets/i);
  }

  async open(): Promise<void> {
    console.log("🌐 Opening Adya Home Page...");

    /* STEP 1: Open Home Page */
    await this.page.goto(process.env.BASE_URL as string, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    });

    /* STEP 2: Perform Login */
    await expect(this.loginButton).toBeVisible({
      timeout: 120000
    });

    const login = new LoginPage(this.page);

    console.log("🔐 Performing login...");

    await login.loginWithPassword(
      process.env.USER_EMAIL as string,
      process.env.USER_PASSWORD as string
    );

    /* STEP 3: Wait for dashboard */
    await this.page.waitForURL('**/sai', {
      timeout: 120000
    });

    await this.page.waitForLoadState('networkidle');

    console.log("✅ Logged into SAI Dashboard");

    /* STEP 4: Click Dev Mode */
    await expect(this.devModeButton).toBeVisible({
      timeout: 120000
    });

    await this.devModeButton.click();

    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(12000);

    console.log("✅ Dev Mode opened");

    /* STEP 5: Click Agent Studio */
    await expect(this.agentStudioMenu).toBeVisible({
      timeout: 120000
    });

    await this.agentStudioMenu.click();

    await this.page.waitForLoadState('networkidle');

    console.log("✅ Agent Studio opened");

    /* STEP 6: Verify page */
    await expect(this.multiAgentNetworkHeading).toBeVisible({
      timeout: 120000
    });

    /* STEP 7: Click Overview */
    await expect(this.overviewMenu).toBeVisible({
      timeout: 120000
    });

    await this.overviewMenu.click();

    await this.page.waitForLoadState('networkidle');

    console.log("✅ Overview opened");

    /* STEP 8: Verify widgets */
    await expect(this.totalProjects).toBeVisible({
      timeout: 120000
    });

    console.log("🎉 Overview page fully loaded");
  }

  async expectWidgetVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible({
      timeout: 120000
    });
  }
}