import { test, expect, Locator } from '@playwright/test';

test('Add to card from Recommended items', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Scroll to bottom of page

    //Verify 'RECOMMENDED ITEMS' are visible
    await expect(page.locator('.recommended_items', { has: page.locator('.text-center') })).toContainText('recommended items');

    //Click on 'Add To Cart' on Recommended product
    const recomProduct: Locator = page.locator('#recommended-item-carousel');
    const firstProduct: Locator = recomProduct.locator('[data-product-id="1"]');
    await firstProduct.click();

    //Click on 'View Cart' button
    await expect(page.locator('#cartModal')).toBeVisible();
    const viewCart: Locator = page.locator('.modal-body a[href="/view_cart"]');
    await viewCart.click();

    //Verify that product is displayed in cart page
    await expect(page.locator('#product-1')).toBeVisible();

});

