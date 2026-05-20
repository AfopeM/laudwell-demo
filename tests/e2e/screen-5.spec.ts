import { test, expect } from '@playwright/test';
import { goToScreen4High, goToScreen4Low, BASE } from './helpers';

test.describe('Screen 5 — High rater (Google redirect)', () => {
  test.beforeEach(async ({ page }) => {
    await goToScreen4High(page);
    await expect(page.locator('textarea')).toBeVisible({ timeout: 2000 });
    await page.getByRole('button', { name: 'Submit Review' }).click();
    await expect(page).toHaveURL(`${BASE}/screen-5`);
  });

  test('shows confirmation copy and countdown', async ({ page }) => {
    await expect(page.getByText('Your review has been copied')).toBeVisible();
    await expect(page.getByText(/Heading to Google in/)).toBeVisible();
  });

  test('"Prefer not to?" cancels the countdown', async ({ page }) => {
    await page.getByText('Prefer not to?').click();

    // Countdown copy disappears
    await expect(page.getByText(/Heading to Google in/)).not.toBeVisible();

    // The opt-out link itself also disappears (component hides it after cancel)
    await expect(page.getByText('Prefer not to?')).not.toBeVisible();
  });

  test('"Take me there" button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Take me there' })).toBeVisible();
  });

  test('progress bar is at 100%', async ({ page }) => {
    const bar = page.locator('.bg-stone-900').first();
    await expect(bar).toHaveAttribute('style', /width:\s*100%/);
  });
});

test.describe('Screen 5 — Low rater (thank you)', () => {
  test.beforeEach(async ({ page }) => {
    await goToScreen4Low(page);
    await page.getByRole('button', { name: 'Submit Feedback' }).click();
    await expect(page).toHaveURL(`${BASE}/screen-5`);
  });

  test('shows thank you copy', async ({ page }) => {
    await expect(page.getByText('Thank you for being honest with us')).toBeVisible();
  });

  test('Google review link is present — policy requirement', async ({ page }) => {
    // The spec is explicit: this link MUST exist on Screen 5b
    await expect(page.getByRole('link', { name: 'Leave a Google review' })).toBeVisible();
  });

  test('Google review link points to the correct URL', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Leave a Google review' });
    await expect(link).toHaveAttribute(
      'href',
      'https://www.google.com/maps/place/GEXR+Extreme+Exteriors/@43.8735361,-78.9523386,17z/data=!4m8!3m7!1s0x89d5b08f7a0585e5:0x6fd758f358e95ae0!8m2!3d43.8735361!4d-78.9497637!9m1!1b1!16s%2Fg%2F1tz96r0m?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D',
    );
  });

  test('progress bar is at 100%', async ({ page }) => {
    const bar = page.locator('.bg-stone-900').first();
    await expect(bar).toHaveAttribute('style', /width:\s*100%/);
  });
});
