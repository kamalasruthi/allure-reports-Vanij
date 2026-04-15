import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class ProjectPage {
  page: Page;

  /* LOGIN */
  loginButton: Locator;

  /* DEV MODE */
  devModeButton: Locator;

  /* SIDEBAR */
  sidebar: Locator;
  agentStudioMenu: Locator;
  projectsMenu: Locator;

  /* PROJECT PAGE */
  createProjectButton: Locator;
  projectNameInput: Locator;
  projectDescriptionInput: Locator;
  submitButton: Locator;

  /* ACTION BUTTONS */
  viewButton: Locator;
  editButton: Locator;
  deleteButton: Locator;
  confirmDeleteInput: Locator;
  confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;

    /* LOGIN */
    this.loginButton =
      page.getByRole('button', { name: /login/i });

    /* DEV MODE */
    this.devModeButton =
      page.getByRole('button', { name: /dev mode/i });

    /* SIDEBAR */
    this.sidebar = page.locator('aside');

    this.agentStudioMenu =
      this.sidebar.getByText('Agent Studio').first();

    this.projectsMenu =
      this.sidebar.getByText('Projects').first();

    /* PROJECT PAGE */
    this.createProjectButton =
      page.getByRole('button', { name: /create new project/i });

    this.projectNameInput =
      page.getByPlaceholder(/project name/i);

    this.projectDescriptionInput =
      page.getByPlaceholder(/project description/i);

    this.submitButton =
      page.getByRole('button', { name: /submit|create/i });

    /* ACTION BUTTONS */
    this.viewButton =
      page.getByRole('button', { name: /view/i }).first();

    this.editButton =
      page.getByRole('button', { name: /edit/i }).first();

    this.deleteButton =
      page.getByRole('button', { name: /delete/i }).first();

    this.confirmDeleteInput =
      page.getByPlaceholder(/delete/i);

    this.confirmDeleteButton =
      page.getByRole('button', { name: /^delete$/i });
  }

  /* ================= NAVIGATION ================= */

  async navigateToProjects(): Promise<void> {
    console.log("🌐 Opening Vanij...");

    await this.page.goto(process.env.BASE_URL as string, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    });

    /* LOGIN */
    console.log("🔐 Starting login process...");

    const login = new LoginPage(this.page);

    await login.loginWithPassword(
      process.env.USER_EMAIL as string,
      process.env.USER_PASSWORD as string
    );

    /* WAIT FOR SAI */
    await this.page.waitForURL(/sai/, {
      timeout: 120000
    });

    console.log("✅ Login completed. SAI opened");

    /* DEV MODE */
    await expect(this.devModeButton).toBeVisible({
      timeout: 120000
    });

    console.log("🚀 Clicking Dev Mode");

    await this.devModeButton.click();

    await this.page.waitForLoadState('networkidle');

    /* AGENT STUDIO */
    await expect(this.agentStudioMenu).toBeVisible({
      timeout: 120000
    });

    console.log("📂 Opening Agent Studio");

    await this.agentStudioMenu.click();

    await this.page.waitForLoadState('networkidle');

    /* PROJECTS */
    await expect(this.projectsMenu).toBeVisible({
      timeout: 120000
    });

    console.log("📁 Opening Projects");

    await this.projectsMenu.click();

    /* VERIFY */
    await expect(this.createProjectButton).toBeVisible({
      timeout: 120000
    });

    console.log("✅ Projects page loaded successfully");
  }

  /* ================= CREATE ================= */

  async createProject(): Promise<void> {
    console.log("➕ Creating Project");

    await this.createProjectButton.click();

    const projectName = `Test Project ${Date.now()}`;

    await this.projectNameInput.fill(projectName);

    await this.projectDescriptionInput.fill(
      "Automation Test Project"
    );

    await this.submitButton.click();

    await this.page.waitForLoadState('networkidle');

    // Optional validation
    await expect(this.page.getByText(projectName)).toBeVisible();

    console.log("✅ Project created:", projectName);
  }

  /* ================= VIEW ================= */

  async viewProject(): Promise<void> {
    console.log("👁 Viewing Project");

    await expect(this.viewButton).toBeVisible();
    await this.viewButton.click();
  }

  /* ================= EDIT ================= */

  async editProject(): Promise<void> {
    console.log("✏ Editing Project");

    await expect(this.editButton).toBeVisible();
    await this.editButton.click();

    const updatedName = `Updated Project ${Date.now()}`;

    await this.projectNameInput.fill(updatedName);

    await this.submitButton.click();

    await expect(this.page.getByText(updatedName)).toBeVisible();
  }

  /* ================= DELETE ================= */

  async deleteProject(): Promise<void> {
    console.log("🗑 Deleting Project");

    await expect(this.deleteButton).toBeVisible();
    await this.deleteButton.click();

    await this.confirmDeleteInput.fill("DELETE");

    await this.confirmDeleteButton.click();

    console.log("✅ Project deleted");
  }
}