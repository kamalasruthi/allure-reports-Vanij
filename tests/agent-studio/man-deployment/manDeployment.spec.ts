import { test, expect } from '@playwright/test';
import { ManDeploymentPage } from '../../pages/manDeployment.page';

test.describe('Agent Studio - MAN Deployment Module', () => {

  let manDeployment: ManDeploymentPage;

  test.beforeEach(async ({ page }) => {
    manDeployment = new ManDeploymentPage(page);
    await manDeployment.navigateToManDeployment();
  });

  test('Verify user can open MAN page', async () => {
    await manDeployment.openManProject();
  });

  test('Verify user can deploy MAN', async () => {
    await manDeployment.openManProject();
    await manDeployment.deployMan();
  });

  test('Verify MAN deployment status', async () => {
    await manDeployment.openManProject();
    await manDeployment.deployMan();
    await manDeployment.verifyDeploymentStatus();
  });

});