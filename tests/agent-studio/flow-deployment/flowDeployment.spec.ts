import { test, expect, Page } from '@playwright/test';
import { FlowDeploymentPage } from '../../pages/flowDeployment.page';

test.describe('Agent Studio - Flow Deployment Module', () => {

  let flowDeployment: FlowDeploymentPage;

  test.beforeEach(async ({ page }: { page: Page }) => {

    flowDeployment = new FlowDeploymentPage(page);

    await flowDeployment.navigateToFlowDeployment();

  });

  test('Verify user can open Flow Deployment page', async () => {

    await flowDeployment.verifyDeploymentStarted();

  });

  test('Verify user can switch environment', async () => {

    await flowDeployment.selectProductionEnvironment();
    await flowDeployment.selectUATEnvironment();

  });

  test('Verify user can select project and flow', async () => {

    await flowDeployment.selectProjectAndFlow();

  });

  test('Verify user can deploy flow', async () => {

    await flowDeployment.selectProjectAndFlow();
    await flowDeployment.deployFlow();

  });

});