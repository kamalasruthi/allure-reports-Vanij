const { test } = require('@playwright/test');
const { OverviewPage } = require('../../pages/overview.page');

test.describe('Agent Studio – Overview', () => {

  test.beforeEach(async ({ page }) => {
    const overview = new OverviewPage(page);
    await overview.open();
  });

  test('@smoke Verify Total Projects count is visible', async ({ page }) => {
    const overview = new OverviewPage(page);
    await overview.expectWidgetVisible(overview.totalProjects);
  });

  test('Verify Total Flows count is visible', async ({ page }) => {
    const overview = new OverviewPage(page);
    await overview.expectWidgetVisible(overview.totalFlows);
  });

  test('Verify Total Users count is visible', async ({ page }) => {
    const overview = new OverviewPage(page);
    await overview.expectWidgetVisible(overview.totalUsers);
  });

  test('Verify Storage usage is visible', async ({ page }) => {
    const overview = new OverviewPage(page);
    await overview.expectWidgetVisible(overview.storageUsage);
  });

  test('Verify Deployed Flows count is visible', async ({ page }) => {
    const overview = new OverviewPage(page);
    await overview.expectWidgetVisible(overview.deployedFlows);
  });

  test('Verify Deployed Components count is visible', async ({ page }) => {
    const overview = new OverviewPage(page);
    await overview.expectWidgetVisible(overview.deployedComponents);
  });

  test('Verify Total Tickets count is visible', async ({ page }) => {
    const overview = new OverviewPage(page);
    await overview.expectWidgetVisible(overview.totalTickets);
  });

  test('Verify Pending Tickets count is visible', async ({ page }) => {
    const overview = new OverviewPage(page);
    await overview.expectWidgetVisible(overview.pendingTickets);
  });

  test('Verify Resolved Tickets count is visible', async ({ page }) => {
    const overview = new OverviewPage(page);
    await overview.expectWidgetVisible(overview.resolvedTickets);
  });

  test('Verify Closed Tickets count is visible', async ({ page }) => {
    const overview = new OverviewPage(page);
    await overview.expectWidgetVisible(overview.closedTickets);
  });

});
