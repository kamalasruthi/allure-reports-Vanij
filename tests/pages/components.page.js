const { expect } = require('@playwright/test');
const { LoginPage } = require('./login.page');

class ComponentsPage {

  constructor(page) {

    this.page = page;

    /* LOGIN */
    this.loginButton =
      page.getByRole('button', { name: /login/i });

    this.devModeButton =
      page.getByRole('button', { name: /dev mode/i });

    /* SIDEBAR */
    this.sidebar = page.locator('aside');

    this.agentStudioMenu =
      this.sidebar.getByText('Agent Studio').first();

    this.componentsMenu =
      this.sidebar.getByText('Components').first();

    /* COMPONENT PAGE */
    this.componentsHeading =
      page.getByRole('heading', { name: /components/i });

    this.searchInput =
      page.getByPlaceholder(/search/i);

    /* VARIANT BUTTON */
    this.addVariantButton =
      page.getByRole('button', { name: /add variant/i }).first();

    this.variantNameInput =
      page.getByPlaceholder(/variant name/i);

    this.variantDescriptionInput =
      page.getByPlaceholder(/description/i);

    this.nextButton =
      page.getByRole('button', { name: /^next$/i });

    this.deployLaterOption =
      page.getByText(/deploy later/i);

    this.submitButton =
      page.getByRole('button', { name: /submit|deploy component/i });

    /* READY TO DEPLOY TAB */
    this.readyToDeployTab =
      page.getByText(/ready to deploy/i);

    this.deployButton =
      page.getByRole('button', { name: /deploy/i });

    this.deployedTab =
      page.getByText(/deployed/i);

    /* ERROR MESSAGE */
    this.errorMessage =
      page.locator('.error, .text-red');

  }


  /* ======================
     NAVIGATION
  ====================== */

  async navigateToComponents() {

    console.log("🌐 Opening Vanij");

    await this.page.goto(process.env.BASE_URL, {
      waitUntil: 'domcontentloaded'
    });


    /* LOGIN */
    const login = new LoginPage(this.page);

    await login.loginWithPassword(
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD
    );


    await this.page.waitForURL(/sai/, {
      timeout: 120000
    });


    /* DEV MODE */
    await expect(this.devModeButton).toBeVisible({
      timeout: 120000
    });

    await this.devModeButton.click();


    /* AGENT STUDIO */
    await expect(this.agentStudioMenu).toBeVisible(
      { timeout: 120000 
      });

    await this.agentStudioMenu.click();


    /* COMPONENTS */
    await expect(this.componentsMenu).toBeVisible();

    await this.componentsMenu.click();


    await expect(this.componentsHeading).toBeVisible();

    console.log("✅ Components page opened");

  }


  /* ======================
     CREATE VARIANT
  ====================== */

  async createVariant(name = `Variant-${Date.now()}`) {

    console.log("➕ Creating Variant");

    await this.addVariantButton.click();

    await this.variantNameInput.fill(name);

    await this.variantDescriptionInput.fill(
      "Automation variant description"
    );

    await this.nextButton.click();

    await this.deployLaterOption.click();

    await this.nextButton.click();

    await this.submitButton.click();

    console.log("✅ Variant created:", name);

  }


  /* ======================
     CREATE MAX 5 VARIANTS
  ====================== */

  async createMaxVariants() {

    for (let i = 0; i < 5; i++) {

      await this.createVariant(
        `Variant-${Date.now()}-${i}`
      );

    }

  }


  /* ======================
     VERIFY ERROR >5
  ====================== */

  async verifyVariantLimitError() {

    await this.addVariantButton.click();

    await expect(this.errorMessage).toBeVisible();

    console.log("✅ Variant limit error shown");

  }


  /* ======================
     VIEW VARIANT
  ====================== */

  async viewVariantDetails() {

    await expect(this.page.locator('text=Variant')).toBeVisible();

    console.log("✅ Variant visible");

  }


  /* ======================
     DUPLICATE VALIDATION
  ====================== */

  async verifyDuplicateVariantValidation() {

    const name = `DuplicateVariant`;

    await this.createVariant(name);

    await this.createVariant(name);

    await expect(this.errorMessage).toBeVisible();

    console.log("✅ Duplicate validation works");

  }


  /* ======================
     DEPLOY COMPONENT
  ====================== */

  async deployComponent() {

    await this.readyToDeployTab.click();

    await this.deployButton.click();

    await this.deployedTab.click();

    console.log("✅ Component deployed");

  }


  /* ======================
     DEPLOY LATER OPTION
  ====================== */

  async verifyDeployLaterOption() {

    await this.readyToDeployTab.click();

    await expect(this.page.locator('text=Ready to Deploy'))
      .toBeVisible();

    console.log("✅ Deploy later works");

  }

}

module.exports = { ComponentsPage };
