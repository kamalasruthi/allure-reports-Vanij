import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  page: Page;

  /* ERROR */
  errorMessage: Locator;

  /* LANDING */
  loginButton: Locator;

  /* MODAL */
  loginModal: Locator;

  /* EMAIL */
  emailInput: Locator;
  continueButton: Locator;

  /* OTP */
  verifyCodeButton: Locator;

  /* PASSWORD */
  passwordInput: Locator;
  signInButton: Locator;

  constructor(page: Page) {
    this.page = page;

    /* ERROR */
    this.errorMessage =
      page.getByText(/invalid|incorrect|failed|error|not found|try again/i);

    /* LANDING */
    this.loginButton =
      page.getByRole('button', { name: /login/i });

    /* MODAL */
    this.loginModal =
      page.locator('text=Sign in to your account');

    /* EMAIL */
    this.emailInput =
      page.locator('input[type="email"]');

    this.continueButton =
      page.getByRole('button', { name: /continue/i });

    /* OTP */
    this.verifyCodeButton =
      page.getByRole('button', { name: /verify code/i });

    /* PASSWORD */
    this.passwordInput =
      page.locator('input[type="password"]');

    this.signInButton =
      page.getByRole('button', { name: /sign in/i });
  }

  /* ================= OPEN LOGIN MODAL ================= */
  async openLoginModal(): Promise<void> {
    await this.page.goto('/sai');

    await expect(this.loginButton).toBeVisible({ timeout: 30000 });
    await this.loginButton.click();

    await expect(this.loginModal).toBeVisible({ timeout: 30000 });
  }

  /* ================= OTP LOGIN ================= */
  async loginWithOTP(
    email: string,
    otp: string,
    options: { timeout?: number } = {}
  ): Promise<void> {
    const timeout = options.timeout ?? 30000;

    await this.openLoginModal();

    await expect(this.emailInput).toBeVisible({ timeout });
    await this.emailInput.fill(email);
    await this.continueButton.click();

    await expect(this.verifyCodeButton).toBeVisible({ timeout });

    await this.page.keyboard.type(otp);

    await this.page.waitForTimeout(1000);

    await this.verifyCodeButton.click({ force: true });

    await this.page.waitForURL(/\/sai/i, { timeout });
  }

  /* ================= PASSWORD LOGIN ================= */
  async loginWithPassword(
    email: string,
    password: string,
    options: { timeout?: number } = {}
  ): Promise<void> {
    const timeout = options.timeout ?? 30000;

    await this.openLoginModal();

    await expect(this.emailInput).toBeVisible({ timeout });
    await this.emailInput.fill(email);
    await this.continueButton.click();

    await expect(this.passwordInput).toBeVisible({ timeout });
    await this.passwordInput.fill(password);

    await this.signInButton.click({ force: true });

    await this.page.waitForURL(/\/sai/i, { timeout });
  }
}