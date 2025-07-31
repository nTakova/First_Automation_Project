import { test, expect } from '@playwright/test';

test('View Category produts', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    // Verify Categories are visible on the left side
    await expect(page.locator('div.left-sidebar')).toContainText('Category');

    //Click on 'Women' category
    await page.getByRole('link', { name: 'Women' }).click();

    //Click on any category link under 'Women' category, for example: Dress
    await page.getByRole('link', { name: 'Dress' }).click();

    //Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    await expect(page.locator('div.features_items h2.text-center')).toHaveText('Women - Dress Products');

    //On left side bar, click on any sub-category link of 'Men' category
    await page.locator('a[href="#Men"]').click();
    await page.locator('div.panel-body a', { hasText: 'Tshirts' }).click();

    //Verify that user is navigated to that category page
    await expect(page.locator('div.features_items h2.text-center')).toHaveText('Men - Tshirts Products');

});