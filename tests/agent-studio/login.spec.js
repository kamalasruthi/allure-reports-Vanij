const { test, expect } = require('@playwright/test');

test.describe('Login – Standard OTP', () => {

  test('Verify user can login using standard OTP', async ({ page }) => {

    await page.goto(process.env.BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Click Login
    await page.getByRole('button', { name: /^login$/i }).click();

    // Enter Email
    const emailInput = page.getByPlaceholder('name@example.com');
    await emailInput.waitFor({ state: 'visible', timeout: 30000 });
    await emailInput.fill(process.env.USER_EMAIL);

    // Continue
    await page.getByRole('button', { name: /continue/i }).click();

    // Wait for OTP screen
    await expect(page.getByText(/sign in to your account/i))
      .toBeVisible({ timeout: 30000 });

    // Enter OTP (single numeric input)
    const otpInput = page.locator(
      'input[inputmode="numeric"], input[type="tel"]'
    );
    await otpInput.waitFor({ state: 'visible', timeout: 30000 });
    await otpInput.fill(process.env.STANDARD_OTP);

    // Verify Code
    await page.getByRole('button', { name: /verify code/i }).click();

    // ✅ SUCCESS ASSERTION (UPDATED)
    await expect(page).toHaveURL(/\/sai/i);
  });

});
