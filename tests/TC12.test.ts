import { test, expect } from '@playwright/test';

test ('Add to Shopping cart', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

//Verify that home page is visible successfully
    await expect(page.locator('.navbar-nav')).toBeVisible();

//Click on 'Products' button
    //await page.locator('ul.navbar-nav a[href="/products"]').click();
    await page.locator('.card_travel').click();
    
//Hover over first product and click 'Add to cart
    const firstItem = page.locator ('.product-image-wrapper').filter({has:page.locator('[data-product-id="1"]')});
    await firstItem.hover();
    // await expect(page.locator('.overlay-content')).toBeVisible();
    //await page.locator('[data-product-id="1"]').filter({has:page.locator('.fa-shopping-cart')}).click();
    const addToCart= page.locator('.overlay-content').filter({has:page.locator('[data-product-id="1"]')});
    const cartButton = addToCart.locator('.fa-shopping-cart');
    await cartButton.click();
    //await addToCart.filter({has:page.locator('.fa-shopping-cart')}).click();

//Click 'Continue Shopping' button
    await expect (page.locator('#cartModal')).toBeVisible();
    await page.locator('.btn-block').click();

//Hover over second product and click 'Add to cart'
    const secondItem = page.locator ('.product-image-wrapper').filter({has:page.locator('[data-product-id="2"]')});
    await secondItem.hover();
    const addToCart2= page.locator('.overlay-content').filter({has:page.locator('[data-product-id="2"]')});
    const cartButton2 = addToCart2.locator('.fa-shopping-cart');
    await cartButton2.click();

//Click 'View Cart' button
    await expect (page.locator('#cartModal')).toBeVisible();
    const viewCart = page.locator('.modal-body a[href="/view_cart"]');
    await viewCart.click();

//Verify both products are added to Cart

//първо валидираме, че са добавени два продукта; след това валидираме, че е добавен продукт 1 и продукт 2?
//достатъчно ли е да проверим само, че има продукти с ид1 и ид2 в кошницата?da
    await expect (page.locator('#product-1')).toBeVisible();
    await expect (page.locator('#product-2')).toBeVisible();

//Verify their prices, quantity and total price
//в отделен тeст - validationTC

});

/*
Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Products' button
5. Hover over first product and click 'Add to cart'
6. Click 'Continue Shopping' button
7. Hover over second product and click 'Add to cart'
8. Click 'View Cart' button
9. Verify both products are added to Cart
10. Verify their prices, quantity and total price
*/