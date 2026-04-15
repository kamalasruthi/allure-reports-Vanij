import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class ComponentsDeploymentPage {
  page: Page;

  /* LOGIN */
  loginButton: Locator;
  devModeButton: Locator;

  /* SIDEBAR */
  iconSidebar: Locator;
  textSidebar: Locator;
  agentStudioIcon: Locator;
  componentsMenu: Locator;

  /* COMPONENT PAGE */
  searchBox: Locator;
  addVariantButton: Locator;

  /* VARIANT CREATION */
  variantNameInput: Locator;
  variantDescriptionInput: Locator;
  nextButton: Locator;
  createOwnServiceOption: Locator;
  deployLaterOption: Locator;
  submitButton: Locator;

  /* DEPLOYMENT */
  compDeploymentMenu: Locator;
  readyToDeployTab: Locator;
  deployedTab: Locator;
  deployButton: Locator;

  /* CLOUD STUDIO */
  cloudStudioIcon: Locator;
  infraDeploymentMenu: Locator;
  runningStatus: Locator;

  /* DELETE */
  deleteIcon: Locator;
  deleteConfirmInput: Locator;
  confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;

    /* LOGIN */
    this.loginButton =
      page.getByRole('button', { name: /login/i });

    this.devModeButton =
      page.getByRole('button', { name: /dev mode/i });

    /* SIDEBAR */
    this.iconSidebar =
      page.locator('aside').first();

    this.textSidebar =
      page.locator('aside').nth(1);

    this.agentStudioIcon =
      this.iconSidebar.locator('a,button').nth(1);

    this.componentsMenu =
      this.textSidebar.getByText('Components');

    /* COMPONENT PAGE */
    this.searchBox =
      page.getByPlaceholder(/search/i);

    this.addVariantButton =
      page.getByRole('button', { name: /add variant/i }).first();

    /* VARIANT CREATION */
    this.variantNameInput =
      page.getByPlaceholder(/variant name/i);

    this.variantDescriptionInput =
      page.getByPlaceholder(/description/i);

    this.nextButton =
      page.getByRole('button', { name: /^next$/i });

    this.createOwnServiceOption =
      page.getByText(/create own service/i);

    this.deployLaterOption =
      page.getByText(/deploy later/i);

    this.submitButton =
      page.getByRole('button', { name: /submit/i });

    /* DEPLOYMENT */
    this.compDeploymentMenu =
      this.textSidebar.getByText(/comp deployment/i);

    this.readyToDeployTab =
      page.getByText(/ready to deploy/i);

    this.deployedTab =
      page.getByText(/deployed/i);

    this.deployButton =
      page.getByRole('button', { name: /deploy component/i });

    /* CLOUD STUDIO */
    this.cloudStudioIcon =
      this.iconSidebar.locator('a,button').nth(2);

    this.infraDeploymentMenu =
      page.getByText(/infra deployment/i);

    this.runningStatus =
      page.getByText(/running/i);

    /* DELETE */
    this.deleteIcon =
      page.locator('[data-testid="delete"]').first();

    this.deleteConfirmInput =
      page.getByPlaceholder(/delete/i);

    this.confirmDeleteButton =
      page.getByRole('button', { name: /^delete$/i });
  }

  /* ------------------------------------------------ */
  /* NAVIGATION */
  /* ------------------------------------------------ */

  async navigateToComponents(): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}/sai`);

    const login = new LoginPage(this.page);

    await login.loginWithPassword(
      process.env.USER_EMAIL as string,
      process.env.USER_PASSWORD as string
    );

    await expect(this.devModeButton).toBeVisible({ timeout: 120000 });

    await this.devModeButton.click();

    await expect(this.iconSidebar).toBeVisible({ timeout: 120000 });

    await this.agentStudioIcon.click();

    await expect(this.componentsMenu).toBeVisible({ timeout: 120000 });

    await this.componentsMenu.click();

    await expect(this.searchBox).toBeVisible({ timeout: 120000 });
  }

  /* ------------------------------------------------ */
  /* CREATE VARIANT */
  /* ------------------------------------------------ */

  async createVariant(): Promise<void> {
    await this.addVariantButton.click();

    await this.variantNameInput.fill(
      `AutoVariant-${Date.now()}`
    );

    await this.variantDescriptionInput.fill(
      "Automation Test Variant"
    );

    await this.nextButton.click();

    await this.createOwnServiceOption.click();

    await this.deployLaterOption.click();

    await this.nextButton.click();

    await this.submitButton.click();
  }

  /* ------------------------------------------------ */
  /* VERIFY READY TO DEPLOY */
  /* ------------------------------------------------ */

  async verifyReadyToDeploy(): Promise<void> {
    await this.compDeploymentMenu.click();

    await expect(this.readyToDeployTab).toBeVisible();
  }

  /* ------------------------------------------------ */
  /* DEPLOY COMPONENT */
  /* ------------------------------------------------ */

  async deployComponent(): Promise<void> {
    await this.deployButton.click();
  }

  /* ------------------------------------------------ */
  /* VERIFY DEPLOYED */
  /* ------------------------------------------------ */

  async verifyDeployed(): Promise<void> {
    await this.deployedTab.click();

    await expect(this.deployedTab).toBeVisible();
  }

  /* ------------------------------------------------ */
  /* VERIFY CLOUD STUDIO */
  /* ------------------------------------------------ */

  async verifyCloudDeployment(): Promise<void> {
    await this.cloudStudioIcon.click();

    await this.infraDeploymentMenu.click();

    await expect(this.runningStatus).toBeVisible({
      timeout: 120000
    });
  }

  /* ------------------------------------------------ */
  /* DELETE COMPONENT */
  /* ------------------------------------------------ */

  async deleteComponent(): Promise<void> {
    await this.deleteIcon.click();

    await this.deleteConfirmInput.fill("DELETE");

    await this.confirmDeleteButton.click();
  }
}