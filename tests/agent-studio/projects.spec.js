const { test, expect } = require('@playwright/test');
const { ProjectPage } = require('../pages/project.page');

test.describe('Vanij Agent Studio - Projects Module', () => {

  let project;

  test.beforeEach(async ({ page }) => {

    project = new ProjectPage(page);

    // Navigate to Projects page (includes login, dev mode, agent studio navigation)
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
