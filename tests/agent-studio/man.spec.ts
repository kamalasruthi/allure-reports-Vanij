import { test, expect } from '@playwright/test';
import { MANPage } from '../pages/man.page';

test.describe(
  'Vanij Multi Agent Network Workflow',
  () => {

    let man: MANPage;

    test.beforeEach(async ({ page }) => {

      man = new MANPage(page);

    });

    test(
      'Login → Agent Studio → MAN → Create MAN → Send Prompt',
      async () => {

        await man.createMANWorkflow();

        await expect(
          man.initializingText
        ).toBeVisible({
          timeout: 120000,
        });

        console.log(
          '✅ MAN Workflow Executed Successfully'
        );
      }
    );
  }
);