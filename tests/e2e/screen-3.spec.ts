import { test, expect } from '@playwright/test';
import { BASE } from './helpers';
import { SCREEN_1_OPTIONS, SCREEN_2_OPTIONS } from '@/config/questions';

test.describe('Screen 3 — Star Rating', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/screen-0`);
    await page.getByRole('button', { name: 'Begin Review' }).click();
    await page.getByText(SCREEN_1_OPTIONS[0]).click();
    await page.getByText(SCREEN_2_OPTIONS[1]).click();
    await expect(page).toHaveURL(`${BASE}/screen-3`);
  });

  test('renders the question and Continue button', async ({ page }) => {
    await expect(page.getByRole('heading')).toContainText('How would you rate');
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  });

  test('does NOT auto-advance — Continue button is required', async ({ page }) => {
    const slider = page.locator('input[type="range"]');
    await slider.evaluate((el: HTMLInputElement) => {
      el.value = '4';
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await expect(page).toHaveURL(`${BASE}/screen-3`);
  });

  test('5-star confirm routes to screen-4 (high-rater path)', async ({ page }) => {
    const slider = page.locator('input[type="range"]');
    await slider.evaluate((el: HTMLInputElement) => {
      el.value = '5';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(`${BASE}/screen-4`);
  });

  test('2-star confirm routes to screen-4 (low-rater path)', async ({ page }) => {
    const slider = page.locator('input[type="range"]');
    await slider.evaluate((el: HTMLInputElement) => {
      el.value = '2';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(`${BASE}/screen-4`);
  });

  test('progress bar is at 60%', async ({ page }) => {
    const bar = page.locator('[style*="width"]').first();
    await expect(bar).toHaveAttribute('style', /width:\s*60%/);
  });
});
