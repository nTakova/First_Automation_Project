import { test, expect } from '@playwright/test';

test ('Verify all products', async ({page}) => {
    await page.goto('https://automationexercise.com/');
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();
    
//Home page is visible
    //await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).nth(3)).toBeVisible();
    //await expect(page.locator('.container')).toBeVisible;
    //await expect(page.locator('ul.nav.navbar-nav')).toBeVisible();
    await expect(page.locator('.navbar-nav')).toBeVisible();
    
//Click on Products button
    //await page.getByRole('link', { name: ' Products' }).click();
    //await page.locator('ul.navbar-nav a[href="/products"]').click();
    //await page.locator('.material-icons').click();
    await page.locator('.card_travel').click();

//Verify user is navigated to ALL PRODUCTS page successfully
    await expect (page).toHaveURL('https://automationexercise.com/products');
    
//The products list is visible
    //await expect(page.getByText("All Products", {exact:true})).toBeVisible;
    await expect (page.locator("h2.title")).toBeVisible();

//Click on 'View Product' of first product
    await page.locator('[href="/product_details/1"]').click();

//User is landed to product detail page
    await expect (page).toHaveURL('https://automationexercise.com/product_details/1');

//Verify that detail is visible: product name, category, price, availability, condition, brand
    await expect (page.locator('.product-information', {hasText:"Blue Top"})).toBeVisible();
    await expect (page.locator('.product-information', {hasText:"Category"})).toBeVisible();
    //price
    await expect (page.locator('.product-information', {hasText:"Availability:"})).toBeVisible();
    await expect (page.locator('.product-information', {hasText:"Condition:"})).toBeVisible();
    await expect (page.locator('.product-information', {hasText:"Brand:"})).toBeVisible();

});