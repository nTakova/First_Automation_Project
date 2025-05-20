import { test, expect } from '@playwright/test';

test ('Remove produts', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

//Verify that home page is visible successfully
    await expect(page.locator('.navbar-nav')).toBeVisible();

//click Products button
    //await page.locator('ul.navbar-nav a[href="/products"]').click();
    await page.locator('.card_travel').click();

//Add products to cart 
    const firstItem = page.locator ('.product-image-wrapper').filter({has:page.locator('[data-product-id="1"]')});
    await firstItem.hover();
    const addToCart= page.locator('.overlay-content').filter({has:page.locator('[data-product-id="1"]')});
    const cartButton = addToCart.locator('.fa-shopping-cart');
    await cartButton.click();

// Click 'Continue
    await expect (page.locator('#cartModal')).toBeVisible();
    await page.locator('.btn-block').click();

//second product and click 'Add to cart'
    const secondItem = page.locator ('.product-image-wrapper').filter({has:page.locator('[data-product-id="2"]')});
    await secondItem.hover();
    const addToCart2= page.locator('.overlay-content').filter({has:page.locator('[data-product-id="2"]')});
    const cartButton2 = addToCart2.locator('.fa-shopping-cart');
    await cartButton2.click();

//Click 'View Cart' button
    await expect (page.locator('#cartModal')).toBeVisible();
    const viewCart = page.locator('.modal-body a[href="/view_cart"]');
    await viewCart.click();

//Verify that cart page is displayed
    await expect (page).toHaveURL('https://automationexercise.com/view_cart');

//Click 'X' button corresponding to particular product
    //const deleteItem = page.locator('#product-1').filter({has:page.locator('a.cart_quantity_delete')});
    const deleteItem = page.locator('a.cart_quantity_delete[data-product-id="1"]');
    await (deleteItem).click();
    //const deleteItem2 = page.locator('#product-2').filter({has:page.locator('a.cart_quantity_delete')});
    const deleteItem2 = page.locator('a.cart_quantity_delete[data-product-id="2"]');
    await (deleteItem2).click();
    const deleteItem3 = page.locator('#product-3').filter({has:page.locator('a.cart_quantity_delete')});

//Verify that product is removed from the cart
    await expect(deleteItem && deleteItem2).toHaveCount(0);

});