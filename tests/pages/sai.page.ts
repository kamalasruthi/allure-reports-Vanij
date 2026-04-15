import { Page, Locator, expect } from '@playwright/test';

export class SaiPage {
  readonly page: Page;

  // Locators
  readonly viewAllWorkspaces: Locator;
  readonly createWorkspaceBtn: Locator;
  readonly workspaceNameInput: Locator;
  readonly createBtn: Locator;
  readonly chatInput: Locator;

  constructor(page: Page) {
    this.page = page;

    // Update selectors based on actual DOM (VERY IMPORTANT)
    this.viewAllWorkspaces = page.locator('text=View All');
    this.createWorkspaceBtn = page.locator('text=Create Workspace');
    this.workspaceNameInput = page.locator('input[placeholder="Enter workspace name"]');
    this.createBtn = page.locator('button:has-text("Create")');
    this.chatInput = page.locator('textarea, input[placeholder*="Type"], input[placeholder*="Ask"]');
  }

  async navigate() {
    await this.page.goto('https://vanij.adya.ai/sai');
  }

  async login(username: string, password: string) {
    // Update selectors
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');

    // Wait for dashboard
    await expect(this.page).toHaveURL(/dashboard|sai/);
  }

  async goToWorkspaceSection() {
    await this.viewAllWorkspaces.click();
  }

  async createWorkspace(workspaceName: string) {
    await this.createWorkspaceBtn.click();
    await this.workspaceNameInput.fill(workspaceName);
    await this.createBtn.click();
  }

  async verifyWorkspaceCreated() {
    // Adjust validation based on UI
    await expect(this.chatInput).toBeVisible();
  }

  async sendChatPrompt(prompt: string) {
    await this.chatInput.fill(prompt);

    // Press Enter or click send button
    await this.page.keyboard.press('Enter');
  }

  async verifyResponse() {
    // Generic validation (update as needed)
    const response = this.page.locator('text='); // update selector
    await expect(response).toBeVisible();
  }
}