import { test, expect } from '@playwright/test';

test ('Subscription', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

//Home page is visible
    await expect(page.locator('.navbar-nav')).toBeVisible();

//Scroll down to footer

//Verify text 'SUBSCRIPTION'
    await expect(page.locator('div.single-widget')).toContainText("Subscription");

//Enter email address in input and click arrow button
    await page.locator('#susbscribe_email').fill("test@mail.f");
    await page.locator('#subscribe').click();

//Verify success message 'You have been successfully subscribed!' is visible
    await expect (page.locator('#success-subscribe')).toBeVisible();

});

/*
1.Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Scroll down to footer
5. Verify text 'SUBSCRIPTION'
6. Enter email address in input and click arrow button
7. Verify success message 'You have been successfully subscribed!' is visible
*/