import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';


test('Valid login and delete account', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await page.getByRole('button', { name: 'Consent' }).click();
    await loginPage.login('regTest1@mail1.com', 'test');

    //Verify that 'Logged in as username' is visible
    const valueUserName: string = (await page.locator("a", { has: page.locator("i.fa-user") }).textContent())!.trim();
    expect(valueUserName).toBe(`Logged in as test`);

    //Click 'delete' button
    const homePage = new HomePage(page);
    await homePage.clickDelAccountButton();
    await expect(page.locator('h2[data-qa="account-deleted"]')).toHaveText('Account Deleted!');



});
