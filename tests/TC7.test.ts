import { test, expect } from '@playwright/test';

test ('Test cases page', async ({page}) => {
    await page.goto('https://automationexercise.com/');

//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();
    
//Home page is visible
    //await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).nth(3)).toBeVisible();
    //await expect(page.locator('.container')).toBeVisible;
    //await expect(page.locator('ul.nav.navbar-nav')).toBeVisible();
    await expect(page.locator('.navbar-nav')).toBeVisible();

//Click on 'Test Cases' button
    //await page.getByRole('link', { name: ' Test Cases', exact:true }).click();
    //await page.locator('ul.navbar-nav a[href="/test_cases"]').click();
    //await page.locator('.fa-list').click();
    await page.locator('a:has(i.fa-list):has-text("Test Cases")').click();

// Verify user is navigated to test cases page successfully
    await expect(page.locator('b')).toBeVisible();

});
