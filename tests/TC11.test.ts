import { test, expect } from '@playwright/test';

test('Subscription', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Click on 'Cart' button
    await page.locator('i.fa-shopping-cart').click();

    //Verify user is navigated to CART page successfully
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');

    //Verify text 'SUBSCRIPTION'
    await expect(page.locator('div.single-widget h2')).toHaveText("Subscription");

    //Enter email address in input and click arrow button
    await page.locator('#susbscribe_email').fill("test@mail.f");
    await page.locator('#subscribe').click();

    //Verify success message 'You have been successfully subscribed!' is visible
    await expect(page.locator('#success-subscribe')).toContainText('You have been successfully subscribed!');

});
