const { test, expect } = require('@playwright/test');
const { ComponentsPage } =
require('../pages/components.page'); 

test.describe('Agent Studio - Components Module', () => {

  let components;

  test.beforeEach(async ({ page }) => {

    components = new ComponentsPage(page);

    await components.navigateToComponents();

  });


  test('Verify user can create a component variant',
    async () => {

      await components.createVariant();

    });


  test('Verify user can create only 5 variants',
    async () => {

      await components.createMaxVariants();

    });


  test('Verify error shown when creating more than 5 variants',
    async () => {

      await components.verifyVariantLimitError();

    });


  test('Verify user can view variant details',
    async () => {

      await components.viewVariantDetails();

    });


  test('Verify duplicate variant name validation',
    async () => {

      await components.verifyDuplicateVariantValidation();

    });


  test('Verify user can deploy component',
    async () => {

      await components.deployComponent();

    });


  test('Verify user can keep component for later deployment',
    async () => {

      await components.verifyDeployLaterOption();

    });

});
