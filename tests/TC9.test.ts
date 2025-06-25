import { test, expect, Locator } from '@playwright/test';

test('Search product', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Click on 'Products' button
    await page.locator('a', { has: page.locator('i.card_travel') }).click();

    //Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page).toHaveURL('https://automationexercise.com/products');

    //Enter product name in search input and click search button
    const searchTerm: string = 'Dress';
    await page.locator('#search_product').fill(searchTerm);
    await page.locator('#submit_search').click();

    //Verify 'SEARCHED PRODUCTS' is visible
    const searchText: Locator = page.locator('.title.text-center');
    await expect(searchText).toHaveText('Searched Products');

    //Verify all the products related to search are visible
    const products: Locator = page.locator('.productinfo.text-center');

    const productCount: number = await products.count();
    for (let i = 0; i < productCount; i++) {
        const product: Locator = products.nth(i);
        const name: string = await product.locator('p').innerText();
        expect(name.toLowerCase()).toContain(searchTerm);
    }

});