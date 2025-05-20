import { test, expect } from '@playwright/test';

test ('View Cart Brand produts', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

//Verify that home page is visible successfully
    await expect(page.locator('.navbar-nav')).toBeVisible();

//  Verify that Brands are visible on left side bar
    await expect (page.locator('.brands-name')).toBeVisible();

//Click on any brand name
    await page.locator('[href="/brand_products/Polo"]').click();

//Verify that user is navigated to brand page and brand products are displayed
    await expect (page.locator('.text-center').filter({hasText: "Brand - Polo Products"})).toBeVisible();

//On left side bar, click on any other brand link
    await page.locator('[href="/brand_products/Madame"]').click();

//Verify that user is navigated to that brand page and can see products
    await expect (page.locator('.text-center').filter({hasText: "Brand - Madame Products"})).toBeVisible();

});