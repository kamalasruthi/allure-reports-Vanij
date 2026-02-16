const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;

    /* ===== Common Error Message (NEGATIVE CASES) ===== */
    this.errorMessage = page.getByText(
      /invalid|incorrect|failed|error|not found|try again/i
    );

    /* ===== Landing ===== */
    this.loginButton = page.getByRole('button', { name: /login/i });

    /* ===== Login Modal ===== */
    this.loginModal = page.locator('text=Sign in to your account');

    /* ===== Email ===== */
    this.emailInput = page.locator('input[type="email"]');
    this.continueButton = page.getByRole('button', { name: /continue/i });

    /* ===== OTP ===== */
    this.verifyCodeButton = page.getByRole('button', { name: /verify code/i });

    /* ===== Password ===== */
    this.passwordInput = page.locator('input[type="password"]');
    this.signInButton = page.getByRole('button', { name: /sign in/i });
  }

  /* ================= OPEN LOGIN MODAL ================= */
  async openLoginModal() {
    // Navigate to SAI
    await this.page.goto('/sai');

    // Click Login
    await expect(this.loginButton).toBeVisible({ timeout: 30000 });
    await this.loginButton.click();

    // Verify modal opened
    await expect(this.loginModal).toBeVisible({ timeout: 30000 });
  }

  /* ================= OTP LOGIN (STABLE) ================= */
  async loginWithOTP(email, otp) {
    await this.openLoginModal();

    // Enter email
    await expect(this.emailInput).toBeVisible({ timeout: 30000 });
    await this.emailInput.fill(email);
    await this.continueButton.click();

    // OTP screen appears automatically
    await expect(this.verifyCodeButton).toBeVisible({ timeout: 30000 });

    // Type OTP via keyboard (most reliable for split inputs)
    await this.page.keyboard.type(otp);

    // Allow UI validation
    await this.page.waitForTimeout(1000);

    // Verify OTP
    await this.verifyCodeButton.click({ force: true });

    // Assert successful login
    await this.page.waitForURL(/\/sai/i, { timeout: 30000 });
  }

  /* ================= PASSWORD LOGIN (STABLE) ================= */
  async loginWithPassword(email, password) {
    await this.openLoginModal();

    // Enter email
    await expect(this.emailInput).toBeVisible({ timeout: 30000 });
    await this.emailInput.fill(email);
    await this.continueButton.click();

    // Password input appears automatically
    await expect(this.passwordInput).toBeVisible({ timeout: 30000 });
    await this.passwordInput.fill(password);

    // Click Sign In
    await this.signInButton.click({ force: true });

    // Assert successful login
    await this.page.waitForURL(/\/sai/i, { timeout: 30000 });
  }
}

module.exports = { LoginPage };
