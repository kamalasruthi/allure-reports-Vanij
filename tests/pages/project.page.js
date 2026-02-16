const { expect } = require('@playwright/test');
const { LoginPage } = require('./login.page');

class ProjectPage {

  constructor(page) {

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


  /* ============================
     COMPLETE LOGIN + NAVIGATION
     ============================ */

  async navigateToProjects() {

    console.log("🌐 Opening Vanij...");

    await this.page.goto(process.env.BASE_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    });


    /* ALWAYS PERFORM LOGIN */
    console.log("🔐 Starting login process...");

    const login = new LoginPage(this.page);

    await login.loginWithPassword(
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD
    );


    /* WAIT FOR SAI PAGE */
    await this.page.waitForURL(/sai/, {
      timeout: 120000
    });

    console.log("✅ Login completed. SAI opened");


    /* WAIT FOR DEV MODE */
    await expect(this.devModeButton).toBeVisible({
      timeout: 120000
    });

    console.log("🚀 Clicking Dev Mode");

    await this.devModeButton.click();


    /* WAIT DASHBOARD */
    await this.page.waitForLoadState('networkidle');


    /* OPEN AGENT STUDIO */
    await expect(this.agentStudioMenu).toBeVisible({
      timeout: 120000
    });

    console.log("📂 Opening Agent Studio");

    await this.agentStudioMenu.click();


    /* WAIT PAGE LOAD */
    await this.page.waitForLoadState('networkidle');


    /* OPEN PROJECTS */
    await expect(this.projectsMenu).toBeVisible({
      timeout: 120000
    });

    console.log("📁 Opening Projects");

    await this.projectsMenu.click();


    /* VERIFY PROJECT PAGE */
    await expect(this.createProjectButton).toBeVisible({
      timeout: 120000
    });

    console.log("✅ Projects page loaded successfully");

  }


  async createProject() {

    console.log("➕ Creating Project");

    await this.createProjectButton.click();

    const projectName =
      `Test Project ${Date.now()}`;

    await this.projectNameInput.fill(projectName);

    await this.projectDescriptionInput.fill(
      "Automation Test Project"
    );

    await this.submitButton.click();

    await this.page.waitForLoadState('networkidle');

    console.log("✅ Project created:", projectName);

  }


  async viewProject() {

    console.log("👁 Viewing Project");

    await this.viewButton.click();

  }


  async editProject() {

    console.log("✏ Editing Project");

    await this.editButton.click();

    await this.projectNameInput.fill(
      `Updated Project ${Date.now()}`
    );

    await this.submitButton.click();

  }


  async deleteProject() {

    console.log("🗑 Deleting Project");

    await this.deleteButton.click();

    await this.confirmDeleteInput.fill("DELETE");

    await this.confirmDeleteButton.click();

  }

}

module.exports = { ProjectPage };
