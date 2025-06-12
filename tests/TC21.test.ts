import { test, expect } from '@playwright/test';

test('Add review on product', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Click on 'Products' button
    await page.locator('.card_travel').click();

    //Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page.locator('h2.text-center')).toContainText("All Products");

    //Click on 'View Product' button  
    await page.locator('ul.nav-pills a[href="/product_details/1"]').click();

    //Verify 'Write Your Review' is visible
    await expect(page.locator('.nav-tabs')).toBeVisible();

    //Enter name, email and review
    await page.locator('#name').fill('test');
    await page.locator('#email').fill('test@mail.t');
    await page.locator('#review').fill('test');

    //Click 'Submit' button
    await page.locator('#button-review').click();

    //Verify success message 'Thank you for your review.'
    const [messageText] = await Promise.all([
        page.locator('#review-section').textContent(), // хващаме текста веднага
        page.click('#button-review'), // кликът, който задейства и съобщението, и навигацията
        page.waitForLoadState() // изчакваме навигацията след това
    ]);
    console.log('Success message:', messageText);

});