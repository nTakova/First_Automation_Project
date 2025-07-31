import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUp';


test('Register', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const signUpPage = new SignUpPage(page);

    await loginPage.navigate();
    await page.getByRole('button', { name: 'Consent' }).click();

    await loginPage.signUp('test', 'regTest1@mail1.com');
    //await signUpPage.navigate();

    await signUpPage.signUp(
        'Mr',
        'test',
        '1',
        '2',
        '1999',
        true,
        true,
        'test',
        'test',
        'last test',
        'address test',
        'address2 test',
        'Canada',
        'state test',
        'city test',
        'zip test',
        'mobile test'
    )
    await expect(page.locator('h2[data-qa="account-created"]')).toContainText('Account Created!');

});