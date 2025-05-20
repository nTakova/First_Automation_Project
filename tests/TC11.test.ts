import { test, expect } from '@playwright/test';

test ('Subscription', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

//Verify that home page is visible successfully
    await expect(page.locator('.navbar-nav')).toBeVisible();

//Click on 'Cart' button
    await page.locator('[href="/view_cart"]').filter({has:page.locator('i.fa-shopping-cart')}).click(); 
//с href не е най-добрия вариант, но не успях да намеря друг работещ вариант
//await page.locator('.fa-shopping-cart').filter({hasText:" Cart"}).click();


//Verify user is navigated to CART page successfully
    await expect (page).toHaveURL('https://automationexercise.com/view_cart');

//Verify text 'SUBSCRIPTION'
    await expect(page.locator('div.single-widget')).toContainText("Subscription");
    
//Enter email address in input and click arrow button
    await page.locator('#susbscribe_email').fill("test@mail.f");
    await page.locator('#subscribe').click();

//Verify success message 'You have been successfully subscribed!' is visible
    await expect (page.locator('#success-subscribe')).toBeVisible();

});

/*
Verify that home page is visible successfully
4. Click 'Cart' button
5. Scroll down to footer
6. Verify text 'SUBSCRIPTION'
7. Enter email address in input and click arrow button
8. Verify success message 'You have been successfully subscribed!' is visible
*/
