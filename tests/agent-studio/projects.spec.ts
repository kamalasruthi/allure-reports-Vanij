import { test, expect } from '@playwright/test';
import { ProjectPage } from '../pages/project.page';

test.describe('Vanij Agent Studio - Projects Module', () => {

  let project: ProjectPage;

  test.beforeEach(async ({ page }) => {
    project = new ProjectPage(page);

    // Navigate to Projects page
    await project.navigateToProjects();
  });

  test('Create Project', async () => {
    await project.createProject();
  });

  test('View Project', async () => {
    await project.viewProject();
  });

  test('Edit Project', async () => {
    await project.editProject();
  });

  test('Delete Project', async () => {
    await project.deleteProject();
  });

});