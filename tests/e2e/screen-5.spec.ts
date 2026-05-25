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
    await expect(page.getByText('Your review is ready to copy')).toBeVisible();
    await expect(page.getByText(/Heading to Google in/)).toBeVisible();
  });

  test('"Prefer not to?" cancels the countdown', async ({ page }) => {
    await page.getByText('Prefer not to?').click();

    // Countdown copy disappears
    await expect(page.getByText(/Heading to Google in/)).not.toBeVisible();

    // The opt-out link itself also disappears (component hides it after cancel)
    await expect(page.getByRole('button', { name: /Prefer not to/i })).not.toBeVisible();
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
      'https://www.google.com/search?sxsrf=ANbL-n63wEpd3wQCSPES9oSngVk0qGmrzg:1779405977950&si=AL3DRZHrmvnFAVQPOO2Bzhf8AX9KZZ6raUI_dT7DG_z0kV2_x6QEogh3gMtbWg4oWFqG6ue9qkj9dcW4IXILGrr5fdBa04-6_fm3PSut4WfHz5520Uib94iZJveAsVPa7-2BKVi2sXnjm87SG-WUJPbGJSvEsH4sDw%3D%3D&q=GEXR+Extreme+Exteriors+Reviews#lrd=0x89d5b08f7a0585e5:0x6fd758f358e95ae0,3,,,,',
    );
  });

  test('progress bar is at 100%', async ({ page }) => {
    const bar = page.locator('.bg-stone-900').first();
    await expect(bar).toHaveAttribute('style', /width:\s*100%/);
  });
});
