import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';


test('Test case page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigateHome();
    await page.getByRole('button', { name: 'Consent' }).click();

    await homePage.clickTestCaseButton();
    await expect(page).toHaveURL('https://automationexercise.com/test_cases');

});