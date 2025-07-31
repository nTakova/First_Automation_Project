import { test, expect, Locator } from '@playwright/test';

test('Validate price', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Hover over first product and click 'Add to cart'
    await page.locator('a', { has: page.locator('i.card_travel') }).click();
    const firstItem: Locator = page.locator('div.product-image-wrapper').filter({ has: page.locator('a[data-product-id="1"]') });
    await firstItem.hover();
    const firstItemContent = firstItem.locator('div.overlay-content').locator('a[data-product-id="1"]');
    await firstItemContent.click();

    //Click 'Continue Shopping' button
    await expect(page.locator('#cartModal')).toBeVisible();
    await page.locator('button.btn-block').click();

    //Hover over FIRST product Again and click 'Add to cart'
    await page.locator('a', { has: page.locator('i.card_travel') }).click();
    await firstItem.hover();
    await firstItemContent.click();

    //Click 'View Cart' button
    await page.locator('div.modal-body a', { hasText: 'View Cart' }).click();

    //Verify both products are added to Cart
    await expect(page.locator('#product-1')).toBeVisible();

    //Verify their prices, quantity and total price
    const displayedPrice: string = (await page.locator('#product-1 td.cart_price').textContent())!.trim();
    const price: number = parseFloat(displayedPrice);

    const displayedProductQuantity: string = (await page.locator('#product-1 td.cart_quantity').textContent())!.trim();
    const quantity: number = parseInt(displayedProductQuantity);

    const totalPriceExpected: number = price * quantity;

    const displayedTotalPrice: string = (await page.locator('p.cart_total_price').textContent())!.trim();
    const actualTotalPrice: number = parseFloat(displayedTotalPrice);

    expect(actualTotalPrice).toBe(totalPriceExpected);

});
