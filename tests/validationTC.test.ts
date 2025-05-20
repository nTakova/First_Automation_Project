import { test, expect } from '@playwright/test';

test ('Validate price', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

//Verify that home page is visible successfully
    await expect(page.locator('.navbar-nav')).toBeVisible();

//Click on 'Products' button
    await page.locator('ul.navbar-nav a[href="/products"]').click();
    
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

//Click 'Continue Shopping' button
    await expect (page.locator('#cartModal')).toBeVisible();
    await page.locator('.btn-block').click();

//Hover over second product and click 'Add to cart'
    const secondItem2 = page.locator ('.product-image-wrapper').filter({has:page.locator('[data-product-id="2"]')});
    await secondItem.hover();
    const addToCart22= page.locator('.overlay-content').filter({has:page.locator('[data-product-id="2"]')});
    const cartButton22 = addToCart2.locator('.fa-shopping-cart');
    await cartButton22.click();

//Click 'View Cart' button
    await expect (page.locator('#cartModal')).toBeVisible();
    const viewCart = page.locator('.modal-body a[href="/view_cart"]');
    await viewCart.click();

//Verify both products are added to Cart
    await expect (page.locator('#product-1')).toBeVisible();
    await expect (page.locator('#product-2')).toBeVisible();




//Verify their prices, quantity and total price
// verify total price
const price = "Rs. 400";
const priceValue = await page.locator('#product-2 .cart_price').textContent();
expect (priceValue).toContain(price);

const quantity = "2";
const quantityValue = await page.locator('#product-2 .cart_quantity').textContent();
expect (quantityValue).toContain(quantity);

//const priceN = parseInt(price.replace(/[^\d.]/g, ''));
const priceN = parseFloat(price.match(/\d+(\.\d+)?/)[0]);
const quantityN = parseInt(quantity.replace(/[^\d.]/g, ''));


console.log(quantityN);
console.log(priceN);
const totalPrice = (quantityN) * (priceN);
console.log(totalPrice);

const totalValue = await page.locator('#product-2 .cart_total_price').textContent();
const totalV = parseFloat(totalValue.match(/\d+(\.\d+)?/)[0]);
expect (totalV).toBe(totalPrice);

});
