import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test('invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await page.getByRole('button', { name: 'Consent' }).click();

    await loginPage.login('test@mail.com', 'test');

    await expect(page.locator('[action="/login"] p')).toContainText('Your email or password is incorrect!');


});
