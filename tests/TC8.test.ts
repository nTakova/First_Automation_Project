import { test, expect } from '@playwright/test';

test('Verify all products', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Home page is visible
    await expect(page.locator('#slider')).toBeVisible();

    //Click on Products button
    await page.locator('.card_travel').click();

    //Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page).toHaveURL('https://automationexercise.com/products');

    //The products list is visible
    await expect(page.locator('div.features_items')).toBeVisible();

    //Click on 'View Product' of first product
    await page.locator('.col-sm-4').first();
    await (page.locator('i.fa-plus-square')).first().click();

    //User is landed to product detail page
    expect(page.url()).toContain('https://automationexercise.com/product_details');

    //Verify that detail is visible: product name, category, price, availability, condition, brand
    await expect(page.locator('.product-information h2')).toContainText("Blue Top");
    await expect(page.locator('.product-information p').nth(0)).toContainText('Category');
    await expect(page.locator('.product-information span span')).toContainText('Rs.');
    await expect(page.locator('.product-information p').nth(1)).toContainText('Availability:');
    await expect(page.locator('.product-information p').nth(2)).toContainText('Condition:');
    await expect(page.locator('.product-information p').nth(3)).toContainText('Brand:');
});