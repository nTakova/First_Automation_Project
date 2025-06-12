import { test, expect } from '@playwright/test';
import { config } from './config';

test('Delete account', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Home page
    await expect(page.locator('#slider')).toBeVisible();

    //Click on login button
    await page.locator('a i.fa-lock').click();

    //Verify 'Login to your account' is visible
    await expect(page.locator('div.login-form')).toContainText('Login to your account');

    //Enter correct email address and password
    const email: string = "test@qa.20";
    await page.locator('input[data-qa="login-email"]').fill(email);
    await page.locator('input[data-qa="login-password"]').fill(config.password);

    //Click 'login' button
    await page.locator('button[data-qa="login-button"]').click();

    //Verify that 'Logged in as username' is visible
    const userName: string = "TEST"
    const valueUserName: string | null = await (page.locator('a:has(i.fa-user)').textContent());
    const trimmedValue: string | null = (valueUserName as string).trim();
    await expect(trimmedValue).toBe(`Logged in as ${userName}`);

    //Click 'Delete Account' button
    await page.locator('a:has(i.fa-trash-o)').click();

    //Verify that 'ACCOUNT DELETED!' is visible
    await expect(page.locator('[data-qa="account-deleted"]')).toContainText('Account Deleted');
    await page.locator('.btn[data-qa="continue-button"]').click();

});
