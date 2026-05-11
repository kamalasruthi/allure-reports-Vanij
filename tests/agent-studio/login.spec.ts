import { test, expect } from '@playwright/test';

test.describe('Login – Standard OTP', () => {

  test(
    'Verify user can login using standard OTP',
    async ({ page }) => {

      console.log('🌐 Opening Vanij');

      // Open Orchestrator Page
      await page.goto(
        `${process.env.BASE_URL}/orchestrator`,
        {
          waitUntil: 'domcontentloaded',
          timeout: 120000,
        }
      );

      await page.waitForLoadState('networkidle');

      console.log('✅ Orchestrator Page Opened');

      /* ================= LOGIN ================= */

      // Click Normal Login Button
      const loginButton =
        page.getByRole('button', {
          name: /^login$/i,
        });

      await expect(loginButton).toBeVisible({
        timeout: 120000,
      });

      console.log('🔐 Clicking Login');

      await loginButton.click();

      /* ================= EMAIL ================= */

      const emailInput =
        page.locator('input[type="email"]');

      await expect(emailInput).toBeVisible({
        timeout: 120000,
      });

      console.log('📧 Entering Email');

      await emailInput.fill(
        process.env.USER_EMAIL as string
      );

      /* ================= CONTINUE ================= */

      const continueButton =
        page.getByRole('button', {
          name: /continue/i,
        });

      await expect(continueButton).toBeVisible({
        timeout: 120000,
      });

      console.log('➡ Clicking Continue');

      await continueButton.click();

      /* ================= OTP SCREEN ================= */

      await page.waitForTimeout(3000);

      console.log('🔢 Waiting for OTP Input');

      // OTP inputs usually come as 6 separate boxes
      const otpInputs =
        page.locator(
          'input[inputmode="numeric"]'
        );

      await expect(
        otpInputs.first()
      ).toBeVisible({
        timeout: 120000,
      });

      const otp =
        process.env.STANDARD_OTP as string;

      console.log('🔢 Entering OTP:', otp);

      // Fill OTP digit by digit
      for (let i = 0; i < otp.length; i++) {
        await otpInputs.nth(i).fill(otp[i]);
      }

      /* ================= VERIFY CODE ================= */

      const verifyCodeButton =
        page.getByRole('button', {
          name: /verify code/i,
        });

      await expect(
        verifyCodeButton
      ).toBeVisible({
        timeout: 120000,
      });

      console.log('✅ Clicking Verify Code');

      await verifyCodeButton.click();

      /* ================= SUCCESS ================= */

      await page.waitForLoadState(
        'networkidle'
      );

      // Wait for redirect
      await page.waitForURL(
        /orchestrator|dashboard/i,
        {
          timeout: 120000,
        }
      );

      console.log(
        '✅ Login Successful'
      );

      // Final validation
      await expect(page).toHaveURL(
        /orchestrator|dashboard/i
      );

    }
  );

});