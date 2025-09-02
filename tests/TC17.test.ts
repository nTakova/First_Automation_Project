import { test, expect, Locator } from '@playwright/test';

test('Remove produts', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Click Products button
    //Add products to cart 
    await page.locator('a', { has: page.locator('i.card_travel') }).click();
    const firstItem: Locator = page.locator('div.product-image-wrapper').filter({ has: page.locator('a[data-product-id="1"]') });
    await firstItem.hover();
    await firstItem.locator('div.overlay-content').locator('a[data-product-id="1"]').click();

    //Click 'Continue Shopping' button
    await expect(page.locator('div.modal-content')).toBeVisible();
    await page.locator('button.btn-block').click();

    //Hover over second product and click 'Add to cart'
    const secondItem: Locator = page.locator('div.product-image-wrapper').filter({ has: page.locator('a[data-product-id="2"]') });
    await secondItem.hover();
    await secondItem.locator('div.overlay-content').locator('a[data-product-id="2"]').click();

    //Click 'View Cart' button
    await page.locator('div.modal-body a', { hasText: 'View Cart' }).click();

    //Verify that cart page is displayed
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');

    //Click 'X' button corresponding to particular product
    await page.locator('a.cart_quantity_delete[data-product-id="1"]').click();
    await page.locator('a.cart_quantity_delete[data-product-id="2"]').click();

    //Verify that product is removed from the cart
    await expect(page.locator('tbody tr')).toHaveCount(0);

});