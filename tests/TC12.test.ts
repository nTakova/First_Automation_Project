import { test, expect, Locator } from '@playwright/test';

test('Add to Shopping cart', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Click on 'Products' button
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

    //Verify both products are added to Cart

    //първо валидираме, че са добавени два продукта; след това валидираме, че е добавен продукт 1 и продукт 2?
    //достатъчно ли е да проверим само, че има продукти с ид1 и ид2 в кошницата?da
    await expect(page.locator('#product-1')).toBeVisible();
    await expect(page.locator('#product-2')).toBeVisible();

    //Verify their prices, quantity and total price
    //в отделен тeст - validationTC

});
