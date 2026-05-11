import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class ProjectPage {
  page: Page;

  /* SIDEBAR */
  sidebar: Locator;
  agentStudioMenu: Locator;
  projectsMenu: Locator;

  /* PROJECT */
  createProjectButton: Locator;
  projectNameInput: Locator;
  projectDescriptionInput: Locator;
  createProjectSubmitButton: Locator;

  /* FLOW */
  createCustomFlowButton: Locator;
  flowNameInput: Locator;
  flowDescriptionInput: Locator;
  keywordInput: Locator;
  flowTypeDropdown: Locator;
  createFlowButton: Locator;

  /* SUCCESS MESSAGE */
  successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    /* SIDEBAR */
    this.sidebar =
      page.locator('aside');

    /* AGENT STUDIO */
    this.agentStudioMenu =
      page.getByText(/agent studio/i).first();

    /* PROJECTS */
    this.projectsMenu =
      page.getByRole('link', {
        name: /projects/i,
      });

    /* PROJECT */
    this.createProjectButton =
      page.getByRole('button', {
        name: /create new project/i,
      });

    this.projectNameInput =
      page.getByPlaceholder(
        /project name/i
      );

    this.projectDescriptionInput =
      page.getByPlaceholder(
        /project description/i
      );

    this.createProjectSubmitButton =
      page.getByRole('button', {
        name: /^create$/i,
      });

    /* FLOW */
    this.createCustomFlowButton =
      page.getByRole('button', {
        name: /create custom flow/i,
      });

    this.flowNameInput =
      page.getByPlaceholder(
        /flow name/i
      );

    this.flowDescriptionInput =
      page.getByPlaceholder(
        /flow description/i
      );

    this.keywordInput =
      page.getByPlaceholder(
        /keyword/i
      );

    this.flowTypeDropdown =
      page.locator(
        '[role="combobox"]'
      ).first();

    this.createFlowButton =
      page.getByRole('button', {
        name: /^create$/i,
      });

    /* SUCCESS MESSAGE */
    this.successMessage =
      page.getByText(
        /created successfully/i
      );
  }

  /* ================= COMPLETE WORKFLOW ================= */

  async createProjectAndFlow(): Promise<void> {

    console.log('🌐 Opening Vanij');

    await this.page.goto(
      process.env.BASE_URL as string,
      {
        waitUntil: 'domcontentloaded',
        timeout: 200000,
      }
    );

    /* ================= LOGIN ================= */

    console.log('🔐 Starting Login');

    const login =
      new LoginPage(this.page);

    await login.loginWithPassword(
      process.env.USER_EMAIL as string,
      process.env.USER_PASSWORD as string
    );

    await this.page.waitForTimeout(5000);

    console.log(
      '✅ Dashboard Opened Successfully'
    );

    /* ================= AGENT STUDIO ================= */

    console.log(
      '📂 Clicking Agent Studio'
    );

    await expect(
      this.agentStudioMenu
    ).toBeVisible({
      timeout: 120000,
    });

    await this.agentStudioMenu.click({
      force: true,
    });

    await this.page.waitForTimeout(5000);

    console.log(
      '✅ Agent Studio Opened'
    );

    /* ================= PROJECTS ================= */

    console.log(
      '📁 Opening Projects'
    );

    await expect(
      this.projectsMenu
    ).toBeVisible({
      timeout: 120000,
    });

    await this.projectsMenu.click({
      force: true,
    });

    await this.page.waitForTimeout(5000);

    await expect(
      this.createProjectButton
    ).toBeVisible({
      timeout: 120000,
    });

    console.log(
      '✅ Projects Page Opened'
    );

    /* ================= CREATE PROJECT ================= */

    console.log(
      '➕ Creating New Project'
    );

    await this.createProjectButton.click();

    const projectName =
      `Automation Project ${Date.now()}`;

    await expect(
      this.projectNameInput
    ).toBeVisible({
      timeout: 120000,
    });

    await this.projectNameInput.fill(
      projectName
    );

    await this.projectDescriptionInput.fill(
      'Automation Testing Project'
    );

    await this.createProjectSubmitButton.click();

    await this.page.waitForTimeout(5000);

    console.log(
      '✅ Project Created Successfully'
    );

    /* ================= CREATE FLOW ================= */

    await expect(
      this.createCustomFlowButton
    ).toBeVisible({
      timeout: 120000,
    });

    console.log(
      '⚡ Creating Custom Flow'
    );

    await this.createCustomFlowButton.click();

    await this.page.waitForTimeout(5000);

    const flowName =
      `Automation Flow ${Date.now()}`;

    await expect(
      this.flowNameInput
    ).toBeVisible({
      timeout: 120000,
    });

    await this.flowNameInput.fill(
      flowName
    );

    await this.flowDescriptionInput.fill(
      'Automation Flow Description'
    );

    /* KEYWORD */

    await this.keywordInput.fill(
      'automation'
    );

    await this.page.keyboard.press(
      'Enter'
    );

    /* ================= FLOW TYPE ================= */

await this.flowTypeDropdown.click();

await this.page
  .getByRole('option', {
    name: /^Agent$/i,
  })
  .click();
    /* CREATE FLOW */

    await this.createFlowButton.click();

    /* ================= SUCCESS VALIDATION ================= */

    await expect(
      this.successMessage
    ).toBeVisible({
      timeout: 120000,
    });

    console.log(
      '✅ Created Successfully Message Displayed'
    );

    /* TEST PASSED */

    return;
  }
}