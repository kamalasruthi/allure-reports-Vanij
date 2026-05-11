import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';

export class MANPage {

  page: Page;

  /* SIDEBAR */
  agentStudioIcon: Locator;
  multiAgentNetworkMenu: Locator;

  /* MAN PAGE */
  createMANButton: Locator;

  /* CREATE PROJECT MODAL */
  projectNameInput: Locator;
  projectDescriptionInput: Locator;
  createButton: Locator;

  /* SUCCESS MESSAGE */
  successMessage: Locator;

  /* CHAT */
  askAnythingInput: Locator;

  /* INITIALIZING */
  initializingText: Locator;

  constructor(page: Page) {

    this.page = page;

    /* SIDEBAR */

    this.agentStudioIcon =
      page.locator('svg').nth(4);

    this.multiAgentNetworkMenu =
      page.getByTestId(
        'nav-agent-studio-multi-agent-network'
      );

    /* MAN PAGE */

    this.createMANButton =
      page.getByTestId(
        'agent-studio-man-create-network'
      );

    /* CREATE PROJECT MODAL */

    this.projectNameInput =
      page.getByPlaceholder(
        /enter your project name/i
      );

    this.projectDescriptionInput =
      page.getByPlaceholder(
        /enter your project description/i
      );

    this.createButton =
      page.getByRole('button', {
        name: /^create$/i,
      });

    /* SUCCESS MESSAGE */

    this.successMessage =
      page.getByText(
        /project created successfully/i
      );

    /* CHAT */

    this.askAnythingInput =
      page.getByPlaceholder(
        /ask anything/i
      );

    /* INITIALIZING */

    this.initializingText =
      page.getByText(
        /initializing/i
      );
  }

  /* ================= COMPLETE WORKFLOW ================= */

  async createMANWorkflow(): Promise<void> {

    console.log('🌐 Opening Vanij');

    await this.page.goto(
      process.env.BASE_URL as string,
      {
        waitUntil: 'domcontentloaded',
        timeout: 120000,
      }
    );

    /* ================= LOGIN ================= */

    console.log('🔐 Starting Login');

    const login = new LoginPage(this.page);

    await login.loginWithPassword(
      process.env.USER_EMAIL as string,
      process.env.USER_PASSWORD as string
    );

    console.log(
      '✅ Dashboard Opened Successfully'
    );

    /* ================= AGENT STUDIO ================= */

    await this.page.waitForTimeout(5000);

    console.log(
      '📂 Clicking Agent Studio'
    );

    await this.agentStudioIcon.click({
      force: true,
    });

    console.log(
      '✅ Agent Studio Opened'
    );

    /* ================= MULTI AGENT NETWORK ================= */

    await expect(
      this.multiAgentNetworkMenu
    ).toBeVisible({
      timeout: 120000,
    });

    console.log(
      '🤖 Opening Multi Agent Network'
    );

    await this.multiAgentNetworkMenu.click({
      force: true,
    });

    await this.page.waitForTimeout(5000);

    /* ================= CREATE MAN ================= */

    await expect(
      this.createMANButton
    ).toBeVisible({
      timeout: 120000,
    });

    console.log(
      '➕ Creating Multi Agent Network'
    );

    await this.createMANButton.click({
      force: true,
    });

    /* ================= ENTER DETAILS ================= */

    const projectName =
      `MAN Project ${Date.now()}`;

    await expect(
      this.projectNameInput
    ).toBeVisible({
      timeout: 120000,
    });

    await this.projectNameInput.fill(
      projectName
    );

    await this.projectDescriptionInput.fill(
      'Automation MAN Project'
    );

    /* ================= CREATE ================= */

    await this.createButton.click({
      force: true,
    });

    /* ================= SUCCESS MESSAGE ================= */

    await expect(
      this.successMessage
    ).toBeVisible({
      timeout: 120000,
    });

    console.log(
      '✅ Project Created Successfully'
    );

    /* ================= ENTER PROMPT ================= */

    await expect(
      this.askAnythingInput
    ).toBeVisible({
      timeout: 120000,
    });

    console.log(
      '💬 Sending Prompt'
    );

    await this.askAnythingInput.fill(
      'generate me a sports multiagent'
    );

    await this.page.keyboard.press(
      'Enter'
    );

    /* ================= INITIALIZING ================= */

    await expect(
      this.initializingText
    ).toBeVisible({
      timeout: 120000,
    });

    console.log(
      '✅ Multi Agent Network Initialized Successfully'
    );
  }
}