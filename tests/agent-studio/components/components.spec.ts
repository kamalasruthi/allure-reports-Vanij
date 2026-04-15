const { test } = require('@playwright/test');
const { ComponentsPage } = require('../../pages/components.page');

test.describe('Agent Studio – Components', () => {

  test.beforeEach(async ({ page }) => {
    const components = new ComponentsPage(page);
    await components.open();
  });

  test('@smoke Verify Components page loads', async ({ page }) => {
    const components = new ComponentsPage(page);
    await components.expectComponentListed(''); // page loaded check
  });

  test('Verify user can create a component', async ({ page }) => {
    const components = new ComponentsPage(page);

    const name = `AutoComponent-${Date.now()}`;
    await components.createComponent(name, 'Automation test component');
    await components.expectComponentListed(name);
  });

  test('Verify user can edit a component', async ({ page }) => {
    const components = new ComponentsPage(page);

    const updatedName = `UpdatedComponent-${Date.now()}`;
    await components.editFirstComponent(updatedName);
    await components.expectComponentListed(updatedName);
  });

  test('Verify user can delete a component', async ({ page }) => {
    const components = new ComponentsPage(page);
    await components.deleteFirstComponent();
  });

});
