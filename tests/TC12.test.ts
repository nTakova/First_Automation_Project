import { test, expect, Locator } from '@playwright/test';

test('Add to Shopping cart', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //block adds 
    await page.route('**/*adsbygoogle*', route => route.abort());

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Click on 'Products' button
    await page.locator('a', { has: page.locator('i.card_travel') }).click();

    //Hover over first product and click 'Add to cart'
    const firstItem: Locator = page.locator('.product-image-wrapper').filter({ has: page.locator('a[data-product-id="1"]') });
    await firstItem.hover();
    await firstItem.locator('.overlay-content').locator('a[data-product-id="1"]').click();

    //Click 'Continue Shopping' button
    await expect(page.locator('.modal-content')).toBeVisible();
    await page.locator('.btn-block').click();

    //Hover over second product and click 'Add to cart'
    const secondItem: Locator = page.locator('.product-image-wrapper').filter({ has: page.locator('a[data-product-id="2"]') });
    await secondItem.hover();
    await secondItem.locator('.overlay-content').locator('a[data-product-id="2"]').click();

    //Click 'View Cart' button
    await expect(page.locator('.modal-content')).toBeVisible();
    await page.locator('.modal-body a[href="/view_cart"]').click();

    //Verify both products are added to Cart
    await expect(page.locator('#product-1')).toBeVisible();
    await expect(page.locator('#product-2')).toBeVisible();

    //Verify their prices, quantity and total price
    //в отделен тeст - validationTC

});
