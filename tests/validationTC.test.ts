import { test, expect, Locator } from '@playwright/test';

test('Validate price', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    await page.locator('.card_travel').click();

    //Hover over first product and click 'Add to cart'
    await page.locator('ul.navbar-nav a[href="/products"]').click();

    await page.locator('a', { has: page.locator('i.card_travel') }).click();
    const firstItem: Locator = page.locator('.product-image-wrapper').filter({ has: page.locator('a[data-product-id="1"]') });
    await firstItem.hover();
    firstItem.locator('.overlay-content').locator('a[data-product-id="1"]').click();

    //Click 'Continue Shopping' button
    await expect(page.locator('#cartModal')).toBeVisible();
    await page.locator('.btn-block').click();

    //Hover over second product and click 'Add to cart'
    await page.locator('a', { has: page.locator('i.card_travel') }).click();
    const secondItem: Locator = page.locator('.product-image-wrapper').filter({ has: page.locator('a[data-product-id="1"]') });
    await secondItem.hover();
    await secondItem.locator('.overlay-content').locator('a[data-product-id="1"]').click();

    //Click 'View Cart' button
    await page.locator('a[href="/view_cart"]', {
        has: page.locator('i.fa-shopping-cart')
    }).filter({
        hasText: 'Cart'
    }).click();

    //Verify both products are added to Cart
    await expect(page.locator('#product-1')).toBeVisible();
    //await expect(page.locator('#product-2')).toBeVisible();

    //Verify their prices, quantity and total price
    const displayedPrice: string | null = await page.locator('#product-1 .cart_price').textContent();
    const price: number = parseFloat(displayedPrice as string);

    const displayedProductQuantity: string | null = await page.locator('#product-1 .cart_quantity').textContent();
    const quantity: number = parseInt(displayedProductQuantity as string);

    const totalPriceExpected: number = price * quantity;

    const displayedTotalPrice: string | null = await page.locator('.cart_total_price').textContent();
    const actualTotalPrice: number = parseFloat(displayedTotalPrice as string);

    expect(actualTotalPrice).toBe(totalPriceExpected);

});
