import { test } from '@playwright/test';
import { ProjectPage } from '../pages/project.page';

test.describe(
  'Vanij Agent Studio - Complete Workflow',
  () => {

    let project: ProjectPage;

    test.beforeEach(async ({ page }) => {
      project = new ProjectPage(page);
    });

    test(
      'Login → Agent Studio → Projects → Create Project → Create Flow',
      async () => {

        /* ================= COMPLETE WORKFLOW ================= */

        await project.createProjectAndFlow();

        console.log(
          '✅ Complete Workflow Executed Successfully'
        );
      }
    );

  }
);