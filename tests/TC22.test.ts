import { test, expect, Locator } from '@playwright/test';

test('Add to card from Recommended items', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Scroll to bottom of page

    //Verify 'RECOMMENDED ITEMS' are visible
    //await expect(page.locator('.recommended_items', { has: page.locator('.text-center') })).toContainText('recommended items');
    await expect(page.locator('h2.title.text-center').last()).toHaveText('recommended items');

    //Click on 'Add To Cart' on Recommended product
    await page.locator('#recommended-item-carousel').locator('a[data-product-id="1"]').click();

    //Click on 'View Cart' button
    await expect(page.locator('.modal-content')).toBeVisible();
    await page.locator('.modal-body a[href="/view_cart"]').click();

    //Verify that product is displayed in cart page
    await expect(page.locator('#product-1')).toBeVisible();

});

