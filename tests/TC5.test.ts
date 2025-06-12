import { test, expect } from '@playwright/test';
import { config } from './config';

test('Existing email', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Home page is visible
    await expect(page.locator('#slider')).toBeVisible();

    //Click on Login button
    await page.locator('a i.fa-lock').click();

    //Verify 'New User Signup!' is visible
    await expect(page.locator('div.signup-form')).toContainText('New User Signup!');

    //Enter name and already registered email address
    await page.locator('input[data-qa="signup-name"]').fill('test');
    await page.locator('input[data-qa="signup-email"]').fill(config.email);

    //Click 'Signup' button
    await page.locator('button[data-qa="signup-button"]').click();

    //Verify error 'Email Address already exist!' is visible
    await expect(page.locator('p')).toContainText('Email Address already exist!');

});
