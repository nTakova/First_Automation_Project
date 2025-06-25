import { test, expect, Locator } from '@playwright/test';

test('Add to Shopping cart', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Click on 'Products' button
    await page.locator('a', { has: page.locator('i.card_travel') }).click();

    //Hover over first product and click 'Add to cart'
    await page.locator('a', { has: page.locator('i.card_travel') }).click();
    const firstItem: Locator = page.locator('.product-image-wrapper').filter({ has: page.locator('a[data-product-id="1"]') });
    await firstItem.hover();
    await firstItem.locator('.overlay-content').locator('a[data-product-id="1"]').click();
    //add-to-cart - to change the data-product-id - for future tests

    //Click 'Continue Shopping' button
    await expect(page.locator('#cartModal')).toBeVisible();
    await page.locator('.btn-block').click();

});
