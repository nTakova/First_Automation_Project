import { test, expect } from '@playwright/test';

test('View Cart Brand produts', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //  Verify that Brands are visible on left side bar
    await expect(page.locator('div.brands-name')).toBeVisible();
    await expect(page.locator('div.brands_products h2')).toHaveText('Brands');

    //Click on any brand name
    await page.locator('div.brands-name ul li').first().click();

    //Verify that user is navigated to brand page and brand products are displayed
    await expect(page.locator('div.features_items h2.text-center')).toHaveText('Brand - Polo Products');

    //On left side bar, click on any other brand link
    await page.locator('div.brands-name ul li').last().click();

    //Verify that user is navigated to that brand page and can see products
    await expect(page.locator('div.features_items h2.text-center')).toHaveText("Brand - Biba Products");

});