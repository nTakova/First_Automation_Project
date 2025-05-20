import { test, expect } from '@playwright/test';

test ('Product quantity', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

//Verify that home page is visible successfully
    await expect(page.locator('.navbar-nav')).toBeVisible();

//Click on 'View product'
    await page.locator('.nav-justified a[href="/product_details/2"]').click();

//Verify product detail is opened
    await expect (page).toHaveURL('https://automationexercise.com/product_details/2');

//Increase quantity to 4
    const quantity = page.locator('#quantity');
    const count = "4";
    await quantity.fill('4');

//Click 'Add to cart' button
    const addToCart= page.locator('.product-information');
    const cartButton = addToCart.locator('.fa-shopping-cart');
    await cartButton.click();

//Click 'View Cart' button
    await expect (page.locator('#cartModal')).toBeVisible();
    const viewCart = page.locator('.modal-body a[href="/view_cart"]');
    await viewCart.click();

//Verify that product is displayed in cart page with exact quantity
const result = await expect (page.locator('.cart_quantity')).toHaveText(count);


});
