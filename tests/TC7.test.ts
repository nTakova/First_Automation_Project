import { test, expect } from '@playwright/test';

test('Test cases page', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Home page is visible
    await expect(page.locator('#slider')).toBeVisible();

    //Click on 'Test Cases' button
    await page.locator('a:has(i.fa-list)').filter({ hasText: 'Test Cases' }).click();

    // Verify user is navigated to test cases page successfully
    await expect(page).toHaveURL('https://automationexercise.com/test_cases');

});
