import { test, expect, Locator } from '@playwright/test';

test('Product quantity', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Click on 'View product'
    await page.locator('.nav-justified a[href="/product_details/2"]').click();

    //Verify product detail is opened
    await expect(page).toHaveURL('https://automationexercise.com/product_details/2');

    //Increase quantity to 4
    const quantity: Locator = page.locator('#quantity');
    const count: string = "4";
    await quantity.fill('4');

    //Click 'Add to cart' button
    const addToCart: Locator = page.locator('.product-information');
    const cartButton: Locator = addToCart.locator('.fa-shopping-cart');
    await cartButton.click();

    //Click 'View Cart' button
    await expect(page.locator('#cartModal')).toBeVisible();
    const viewCart: Locator = page.locator('.modal-body a[href="/view_cart"]');
    await viewCart.click();

    //Verify that product is displayed in cart page with exact quantity
    const quantityText: string | null = await page.locator('.cart_quantity').textContent();
    expect(quantityText?.trim()).toBe(count);


});
