import { test, expect } from '@playwright/test';

test('Add to card from Recommended items', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Scroll down page to bottom
    await page.locator('.single-widget').scrollIntoViewIfNeeded();

    // Verify 'SUBSCRIPTION' is visible
    await expect(page.locator('div.single-widget h2')).toHaveText("Subscription");

    //Click on arrow at bottom right side to move upward
    await page.locator("#scrollUp").click();

    //Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    await expect(
        page.locator('.carousel-inner')
            .filter({ hasText: "Full-Fledged practice website for Automation Engineers" }))
        .toBeVisible({ timeout: 5000 });
    //await expect(page.locator('.carousel-inner')).toContainText('Full-Fledged practice website for Automation Engineers', { timeout: 5000 });
});
