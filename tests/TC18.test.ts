import { test, expect } from '@playwright/test';

test ('View Category produts', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

//Verify that home page is visible successfully
    await expect(page.locator('.navbar-nav')).toBeVisible();

// Verify Categories are visible on the left side
    await expect (page.locator('#accordian')).toBeVisible();

//Click on 'Women' category
    await page.locator('[href="#Women"]').click();

//Click on any category link under 'Women' category, for example: Dress
    await page.locator('[href="/category_products/1"]').click();

//Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    await expect (page.locator('.text-center').filter({hasText: "Women - Dress Products"})).toBeVisible();

//On left side bar, click on any sub-category link of 'Men' category
    await page.locator('[href="#Men"]').click();
    await page.locator('[href="/category_products/3"]').click();

//Verify that user is navigated to that category page
    await expect (page.locator('.text-center').filter({hasText: "Men - Tshirts Products"})).toBeVisible();

});