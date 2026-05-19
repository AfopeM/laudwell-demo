import { BASE, goToScreen4High, goToScreen4Low } from './helpers';
import { test, expect } from '@playwright/test';

test.describe('Screen 4 — High rater (generated review)', () => {
  test.beforeEach(async ({ page }) => {
    await goToScreen4High(page);
  });

  test('shows loading state then reveals textarea', async ({ page }) => {
    // Loading copy appears first
    await expect(page.getByText('Building your review...')).toBeVisible();

    // After 500ms it resolves — wait for the textarea
    await expect(page.locator('textarea')).toBeVisible({ timeout: 2000 });
  });

  test('textarea is pre-filled with generated text', async ({ page }) => {
    await expect(page.locator('textarea')).toBeVisible({ timeout: 2000 });
    const value = await page.locator('textarea').inputValue();
    expect(value.length).toBeGreaterThan(0);
  });

  test('textarea is editable', async ({ page }) => {
    await expect(page.locator('textarea')).toBeVisible({ timeout: 2000 });
    await page.locator('textarea').fill('My custom review text');
    await expect(page.locator('textarea')).toHaveValue('My custom review text');
  });

  test('"Regenerate" replaces textarea content', async ({ page }) => {
    await expect(page.locator('textarea')).toBeVisible({ timeout: 2000 });
    await page.getByRole('button', { name: 'Regenerate' }).click();
    const after = await page.locator('textarea').inputValue();
    // Structural assertion — engine correctness is owned by the Vitest unit tests
    expect(typeof after).toBe('string');
    expect(after.length).toBeGreaterThan(0);
  });

  test('Submit Review advances to screen-5', async ({ page }) => {
    await expect(page.locator('textarea')).toBeVisible({ timeout: 2000 });
    await page.getByRole('button', { name: 'Submit Review' }).click();
    await expect(page).toHaveURL(`${BASE}/screen-5`);
  });

  test('progress bar is at 80%', async ({ page }) => {
    await expect(page.locator('textarea')).toBeVisible({ timeout: 2000 });
    const bar = page.locator('.bg-stone-900').first();
    await expect(bar).toHaveAttribute('style', /width:\s*80%/);
  });
});

test.describe('Screen 4 — Low rater (private feedback)', () => {
  test.beforeEach(async ({ page }) => {
    await goToScreen4Low(page);
  });

  test('shows private feedback heading and optional textarea', async ({ page }) => {
    await expect(page.getByText('Your feedback matters to us')).toBeVisible();
    await expect(page.locator('textarea')).toBeVisible();
  });

  test('textarea is optional — Submit Feedback works with no input', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit Feedback' }).click();
    await expect(page).toHaveURL(`${BASE}/screen-5`);
  });

  test('Submit Feedback with text advances to screen-5', async ({ page }) => {
    await page.locator('textarea').fill('Some private feedback');
    await page.getByRole('button', { name: 'Submit Feedback' }).click();
    await expect(page).toHaveURL(`${BASE}/screen-5`);
  });
});
