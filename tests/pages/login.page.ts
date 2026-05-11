import { Page, Locator, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class LoginPage {

  page: Page;

  /* LOGIN */
  loginButton: Locator;

  /* EMAIL */
  emailInput: Locator;
  continueButton: Locator;

  /* PASSWORD */
  passwordInput: Locator;
  signInButton: Locator;

  /* OTP */
  verifyCodeButton: Locator;

  constructor(page: Page) {

    this.page = page;

    /* LOGIN BUTTON */
    this.loginButton =
      page.getByRole('button', {
        name: /^login$/i,
      });

    /* EMAIL INPUT */
    this.emailInput =
      page.locator('input[type="email"]');

    /* CONTINUE BUTTON */
    this.continueButton =
      page.getByRole('button', {
        name: /continue/i,
      });

    /* PASSWORD INPUT */
    this.passwordInput =
      page.locator('input[type="password"]');

    /* SIGN IN BUTTON */
    this.signInButton =
      page.getByRole('button', {
        name: /sign in/i,
      });

    /* VERIFY CODE BUTTON */
    this.verifyCodeButton =
      page.getByRole('button', {
        name: /verify code/i,
      });
  }

  /* ================= OPEN LOGIN ================= */

  async openLogin(): Promise<void> {

    console.log('🌐 Opening Vanij');

    await this.page.goto(
      `${process.env.BASE_URL}/orchestrator`,
      {
        waitUntil: 'domcontentloaded',
        timeout: 120000,
      }
    );

    await this.page.waitForLoadState(
      'networkidle'
    );

    console.log('🔐 Clicking Login');

    await expect(
      this.loginButton
    ).toBeVisible({
      timeout: 120000,
    });

    await this.loginButton.click();
  }

  /* ================= PASSWORD LOGIN ================= */

  async loginWithPassword(
    email: string =
      process.env.USER_EMAIL || '',

    password: string =
      process.env.USER_PASSWORD || ''
  ): Promise<void> {

    await this.openLogin();

    /* EMAIL */

    await expect(
      this.emailInput
    ).toBeVisible({
      timeout: 120000,
    });

    console.log('📧 Entering Email');

    await this.emailInput.fill(email);

    /* CONTINUE */

    await this.continueButton.click();

    /* PASSWORD */

    await expect(
      this.passwordInput
    ).toBeVisible({
      timeout: 120000,
    });

    console.log('🔑 Entering Password');

    await this.passwordInput.fill(
      password
    );

    /* SIGN IN */

    await expect(
      this.signInButton
    ).toBeVisible({
      timeout: 120000,
    });

    console.log('✅ Clicking Sign In');

    await this.signInButton.click();

    /* SUCCESS */

    await this.page.waitForLoadState(
      'networkidle'
    );

    console.log(
      '✅ Password Login Successful'
    );
  }

  /* ================= OTP LOGIN ================= */

  async loginWithOTP(
    email: string =
      process.env.USER_EMAIL || '',

    otp: string =
      process.env.STANDARD_OTP || ''
  ): Promise<void> {

    await this.openLogin();

    /* EMAIL */

    await expect(
      this.emailInput
    ).toBeVisible({
      timeout: 120000,
    });

    console.log('📧 Entering Email');

    await this.emailInput.fill(email);

    /* CONTINUE */

    await this.continueButton.click();

    /* OTP INPUT */

    const otpInput =
      this.page.locator(
        'input[inputmode="numeric"], input[type="tel"]'
      ).first();

    await expect(
      otpInput
    ).toBeVisible({
      timeout: 120000,
    });

    console.log('🔢 Entering OTP');

    // Fill full OTP directly
    await otpInput.fill(otp);

    /* VERIFY CODE */

    await expect(
      this.verifyCodeButton
    ).toBeVisible({
      timeout: 120000,
    });

    console.log(
      '✅ Clicking Verify Code'
    );

    await this.verifyCodeButton.click();

    /* SUCCESS */

    await this.page.waitForLoadState(
      'networkidle'
    );

    console.log(
      '✅ OTP Login Successful'
    );
  }
}