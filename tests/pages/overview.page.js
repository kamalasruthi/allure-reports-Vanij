const { expect } = require('@playwright/test');
const { LoginPage } = require('./login.page');

class OverviewPage {

  constructor(page) {

    this.page = page;

    /* LOGIN */
    this.loginButton = page.getByRole('button', { name: /login/i });

    /* SAI DASHBOARD */
    this.devModeButton = page.getByRole('button', { name: /dev mode/i });

    /* DEV MODE SIDEBAR (FIXED LOCATORS) */
    this.agentStudioMenu = page.getByText('Agent Studio', { exact: true }).first();

    this.overviewMenu = page.getByText('Overview', { exact: true }).first();

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

  async open() {

    console.log("🌐 Opening Adya Home Page...");

    // STEP 1: Open Home Page
    await this.page.goto(process.env.BASE_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    });

    // STEP 2: Perform Login
    await expect(this.loginButton).toBeVisible({
      timeout: 120000
    });

    const login = new LoginPage(this.page);

    console.log("🔐 Performing login...");

    await login.loginWithPassword(
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD
    );

    // STEP 3: Wait until redirected to SAI dashboard
    await this.page.waitForURL('**/sai', {
      timeout: 120000
    });

    await this.page.waitForLoadState('networkidle');

    console.log("✅ Logged into SAI Dashboard");

    // STEP 4: Click Dev Mode
    await expect(this.devModeButton).toBeVisible({
      timeout: 120000
    });

    await this.devModeButton.click();

    // VERY IMPORTANT WAIT
    await this.page.waitForLoadState('networkidle');

    await this.page.waitForTimeout(12000);

    console.log("✅ Dev Mode opened");

    // STEP 5: Click Agent Studio
    await expect(this.agentStudioMenu).toBeVisible({
      timeout: 120000
    });

    await this.agentStudioMenu.click();

    await this.page.waitForLoadState('networkidle');

    console.log("✅ Agent Studio opened");

    // STEP 6: Wait for Multi Agent Network page
    await expect(this.multiAgentNetworkHeading).toBeVisible({
      timeout: 120000
    });

    // STEP 7: Click Overview
    await expect(this.overviewMenu).toBeVisible({
      timeout: 120000
    });

    await this.overviewMenu.click();

    await this.page.waitForLoadState('networkidle');

    console.log("✅ Overview opened");

    // STEP 8: Verify overview widgets
    await expect(this.totalProjects).toBeVisible({
      timeout: 120000
    });

    console.log("🎉 Overview page fully loaded");

  }

  async expectWidgetVisible(locator) {

    await expect(locator).toBeVisible({
      timeout: 120000
    });

  }

}

module.exports = { OverviewPage };
