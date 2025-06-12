import { test, expect, Locator } from '@playwright/test';

test('Validate price', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('.navbar-nav')).toBeVisible();

    await page.locator('.card_travel').click();

    //Hover over first product and click 'Add to cart'
    const productCard: Locator = page.locator('.product-image-wrapper')
        .filter({
            has: page.locator('[data-product-id="1"]'),
        });
    await productCard.hover();

    const overlayContent: Locator = productCard.locator('.overlay-content')
        .filter({ has: page.locator('[data-product-id="1"]') });
    const addToCartButton: Locator = overlayContent.locator('.fa-shopping-cart');

    await addToCartButton.click();

    //Click 'Continue Shopping' button
    await expect(page.locator('#cartModal')).toBeVisible();
    await page.locator('.btn-block').click();

    //Hover over THE FIRST product Again
    await productCard.hover();
    await addToCartButton.click();

    const firstProduct: Locator = page.locator('.single-products').first();

    //Click 'View Cart' button
    await expect(page.locator('#cartModal')).toBeVisible();
    const viewCart: Locator = page.locator('.modal-body a[href="/view_cart"]');
    await viewCart.click();

    //Verify both products are added to Cart
    await expect(page.locator('#product-1')).toBeVisible();
    // await expect(page.locator('#product-2')).toBeVisible();


    //Verify their prices, quantity and total price

    const priceText: string | null = await page.locator('#product-1 .cart_price').textContent();
    const price: number = parseFloat(priceText as string);

    const quantityText: string | null = await page.locator('#product-1 .cart_quantity').textContent();
    const quantity: number = parseInt(quantityText as string);

    const totalPriceExpected: number = price * quantity;

    const totalText: string | null = await page.locator('.cart_total_price').textContent();
    const actualTotal: number = parseFloat(totalText as string);

    expect(actualTotal).toBe(totalPriceExpected);


});
