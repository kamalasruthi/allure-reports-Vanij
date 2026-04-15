import { test } from '@playwright/test';
import { ObservabilityPage } from '../pages/observability.page';

test.describe('Agent Studio - Observability Module', () => {

  let observability: ObservabilityPage;

  test.beforeEach(async ({ page }) => {
    observability = new ObservabilityPage(page);
    await observability.navigateToObservability();
  });

  test('Verify Projects Observability', async () => {
    await observability.verifyProjectsObservability();
  });

  test('Verify MAN Observability', async () => {
    await observability.verifyManObservability();
  });

  test('Verify Component Deployment Observability', async () => {
    await observability.verifyComponentDeploymentObservability();
  });

  test('Verify Flow Deployment Observability', async () => {
    await observability.verifyFlowDeploymentObservability();
  });

  test('Verify MAN Deployment Observability', async () => {
    await observability.verifyManDeploymentObservability();
  });

});