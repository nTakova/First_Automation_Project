import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';


test('Subscription on Home page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigateHome();
    await page.getByRole('button', { name: 'Consent' }).click();

    await expect(homePage.subscriptionHome).toHaveText("Subscription");
    await homePage.subscriptionInputField.fill('subscribe@mail.com');
    await expect(page.locator('#success-subscribe')).toHaveText('You have been successfully subscribed!');

});