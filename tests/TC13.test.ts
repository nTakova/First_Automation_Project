import { test, expect, Locator } from '@playwright/test';

test('Product quantity', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Click on 'View product'
    await page.locator('div.product-image-wrapper a[href="/product_details/2"]').click();

    //Verify product detail is opened
    await expect(page).toHaveURL('https://automationexercise.com/product_details/2');

    //Increase quantity to 4
    await page.locator('#quantity').fill('4');

    //Click 'Add to cart' button
    await page.locator('div.product-information').locator('.fa-shopping-cart').click();

    //Click 'View Cart' button
    await page.locator('div.modal-body a', { hasText: 'View Cart' }).click();

    //Verify that product is displayed in cart page with exact quantity
    const quantityText: string = (await page.locator('td.cart_quantity').textContent())!.trim();
    expect(quantityText?.trim()).toBe('4');

});
