import { test, expect } from '@playwright/test';
import { config } from './config';

test('Valid login', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Home page is visible
    await expect(page.locator('#slider')).toBeVisible();

    //Click on Login button
    await page.locator('a', { has: page.locator('i.fa-lock') }).click();

    //Verify 'Login to your account' is visible
    await expect(page.locator('div.login-form h2')).toHaveText('Login to your account');

    //Enter correct email address and password
    await page.locator('input[data-qa="login-email"]').fill(config.email);
    await page.locator('input[data-qa="login-password"]').fill(config.password);

    //Click 'login' button
    await page.locator('button[data-qa="login-button"]').click();

    //Verify that 'Logged in as username' is visible
    const valueUserName: string = (await page.locator("a", { has: page.locator("i.fa-user") }).textContent())!.trim();
    expect(valueUserName).toBe(`Logged in as ${config.userName}`);

    //Click 'Logout' button
    await page.locator('a', { has: page.locator('i.fa-lock') }).click();

    //Verify that user is navigated to login page
    await expect(page).toHaveURL('https://automationexercise.com/login');

});