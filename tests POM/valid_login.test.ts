import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';


test('Valid login and logout', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await page.getByRole('button', { name: 'Consent' }).click();
    const username: string = 'test';
    await loginPage.login('regTest1@mail1.com', username);

    //Verify that 'Logged in as username' is visible
    const valueUserName: string = (await page.locator("a", { has: page.locator("i.fa-user") }).textContent())!.trim();
    expect(valueUserName).toBe(`Logged in as ${username}`);

    //Click 'Logout' button
    const homePage = new HomePage(page);
    await homePage.clickLogoutButton();

    //Verify that user is navigated to login page
    await expect(page).toHaveURL('https://automationexercise.com/login');


});
