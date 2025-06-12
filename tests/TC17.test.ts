import { test, expect, Locator } from '@playwright/test';

test('Remove produts', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //click Products button
    await page.locator('.card_travel').click();

    //Add products to cart 
    await page.locator('ul.navbar-nav a[href="/products"]').click();


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

    //Hover over second product and click 'Add to cart'

    const productCard2: Locator = page.locator('.product-image-wrapper')
        .filter({
            has: page.locator('[data-product-id="2"]'),
        });
    await productCard2.hover();

    const overlayContent2: Locator = productCard2.locator('.overlay-content')
        .filter({ has: page.locator('[data-product-id="2"]') });
    const addToCartButton2: Locator = overlayContent2.locator('.fa-shopping-cart');
    await addToCartButton2.click();

    const firstProduct: Locator = page.locator('.single-products').first();

    //Click 'View Cart' button
    await expect(page.locator('#cartModal')).toBeVisible();
    const viewCart: Locator = page.locator('.modal-body a[href="/view_cart"]');
    await viewCart.click();

    //Verify that cart page is displayed
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');

    //Click 'X' button corresponding to particular product
    const deleteItem: Locator = page.locator('a.cart_quantity_delete[data-product-id="1"]');
    await (deleteItem).click();
    const deleteItem2: Locator = page.locator('a.cart_quantity_delete[data-product-id="2"]');
    await (deleteItem2).click();

    //Verify that product is removed from the cart
    await expect(deleteItem).toHaveCount(0);
    await expect(deleteItem2).toHaveCount(0);

});