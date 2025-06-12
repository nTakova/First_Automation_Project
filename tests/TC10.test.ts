import { test, expect } from '@playwright/test';

test('Subscription', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Home page is visible
    await expect(page.locator('#slider')).toBeVisible();

    //Scroll down to footer

    //Verify text 'SUBSCRIPTION'
    await expect(page.locator('div.single-widget')).toContainText("Subscription");

    //Enter email address in input and click arrow button
    await page.locator('#susbscribe_email').fill("test@mail.f");
    await page.locator('#subscribe').click();

    //Verify success message 'You have been successfully subscribed!' is visible
    await expect(page.locator('#success-subscribe')).toContainText('You have been successfully subscribed!');
});

