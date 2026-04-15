import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Verify title contains "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click "Get started"
  await page.getByRole('link', { name: 'Get started' }).click();

  // Verify Installation heading is visible
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
});