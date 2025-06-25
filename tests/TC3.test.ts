import { test, expect } from '@playwright/test';
import { config } from './config';

test('Invalid login', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Home page is visible
    await expect(page.locator('#slider')).toBeVisible();

    //Click on Login button
    await page.locator('a', { has: page.locator('i.fa-lock') }).click();

    //Verify 'Login to your account' is visible
    await expect(page.locator('div.login-form h2')).toHaveText('Login to your account');

    //Enter INcorrect email address and password
    await page.locator('input[data-qa="login-email"]').fill('testFriday1@looong.meeee');
    await page.locator('input[data-qa="login-password"]').fill(config.password);

    //Click 'login' button
    await page.locator('button[data-qa="login-button"]').click();

    //Verify error 'Your email or password is incorrect!' is visible
    await expect(page.locator('form[action="/login"] p')).toHaveText('Your email or password is incorrect!');
});