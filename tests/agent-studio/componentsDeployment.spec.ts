import { test } from '@playwright/test';
import { ComponentsDeploymentPage } from '../pages/componentsDeployment.page';

test.describe('Agent Studio - Components Deployment', () => {

  let components: ComponentsDeploymentPage;

  test.beforeEach(async ({ page }) => {
    components = new ComponentsDeploymentPage(page);
    await components.navigateToComponents();
  });

  test('Create Variant', async () => {
    await components.createVariant();
  });

  test('Verify Ready to Deploy', async () => {
    await components.verifyReadyToDeploy();
  });

  test('Deploy Component', async () => {
    await components.deployComponent();
  });

  test('Verify Deployed', async () => {
    await components.verifyDeployed();
  });

  test('Verify Cloud Studio Deployment', async () => {
    await components.verifyCloudDeployment();
  });

  test('Delete Component', async () => {
    await components.deleteComponent();
  });

});