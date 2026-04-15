import { test, expect } from '@playwright/test';
import { SaiPage } from './pages/sai.page';

test.describe('SAI Onboarding Flow', () => {

  test('User onboarding → Workspace creation → Chat input', async ({ page }) => {

    const sai = new SaiPage(page);

    // Step 1: Navigate
    await sai.navigate();

    // Step 2: Login
    await sai.login('your_username', 'your_password');

    // Step 3: Go to workspace section
    await sai.goToWorkspaceSection();

    // Step 4: Create workspace
    const workspaceName = 'TestWorkspace_' + Date.now();
    await sai.createWorkspace(workspaceName);

    // Step 5: Verify workspace created (chat window visible)
    await sai.verifyWorkspaceCreated();

    // Step 6: Send prompt
    await sai.sendChatPrompt('Generate a welcome message');

    // Optional validation
    await sai.verifyResponse();

  });

});