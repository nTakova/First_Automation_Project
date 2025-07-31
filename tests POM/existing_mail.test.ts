import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUp';


test('Existig mail', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const signUpPage = new SignUpPage(page);

    await loginPage.navigate();
    await page.getByRole('button', { name: 'Consent' }).click();

    await loginPage.signUp('test', 'regTest1@mail1.com');
    await expect(page.locator('div.signup-form p')).toHaveText('Email Address already exist!');

});
