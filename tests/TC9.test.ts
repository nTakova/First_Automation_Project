import { test, expect } from '@playwright/test';

test('Search product', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Click on 'Products' button
    await page.locator('.card_travel').click();

    //Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page).toHaveURL('https://automationexercise.com/products');

    //Enter product name in search input and click search button
    const searchTerm = 'Dress';
    await page.locator('#search_product').fill(searchTerm);
    await page.locator('#submit_search').click();

    //Verify 'SEARCHED PRODUCTS' is visible
    const searchText = page.locator('.title.text-center');
    await expect(searchText).toHaveText('Searched Products');


    //Verify all the products related to search are visible
    const products = page.locator('.productinfo.text-center');

    const productCount: number = await products.count();
    for (let i = 0; i < productCount; i++) {
        const product = products.nth(i);
        const name = await product.locator('p').innerText();
        expect(name.toLowerCase()).toContain(searchTerm);
    }

});