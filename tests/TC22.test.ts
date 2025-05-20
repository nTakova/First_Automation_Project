import { test, expect } from '@playwright/test';

test ('Add to card from Recommended items', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

//Verify that home page is visible successfully
    await expect(page.locator('.navbar-nav')).toBeVisible();

//Scroll to bottom of page

//Verify 'RECOMMENDED ITEMS' are visible
    await expect(page.locator('.text-center').filter({hasText:"recommended items"})).toBeVisible();

//Click on 'Add To Cart' on Recommended product
    const recomProduct = page.locator('#recommended-item-carousel');
    const addToCart = recomProduct.locator('[data-product-id="1"]');
    await addToCart.click();

//Click on 'View Cart' button
    await expect (page.locator('#cartModal')).toBeVisible();
    const viewCart = page.locator('.modal-body a[href="/view_cart"]');
    await viewCart.click();

//Verify that product is displayed in cart page
await expect(page.locator('#product-1')).toBeVisible();

});

