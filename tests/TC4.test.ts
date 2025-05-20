import { test, expect } from '@playwright/test';
import { config } from './config';

test ('Valid login', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Home page is visible
    //await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).nth(3)).toBeVisible();
    //await expect(page.locator('.container')).toBeVisible;
    //await expect(page.locator('ul.nav.navbar-nav')).toBeVisible();
    await expect(page.locator('.navbar-nav')).toBeVisible();

//Click on Login button
    //await page.getByRole('link', { name: ' Signup / Login' }).click();
    //await page.locator('ul.navbar-nav a[href="/login"]').click();
    await page.locator('i.fa-lock').click();
    
//Verify 'Login to your account' is visible
    //await expect(page.getByText("Login to your account")).toBeVisible();
    await expect (page.locator('div.login-form')).toBeVisible();


//Enter correct email address and password
    /*
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('testcase4@test.bg');
    await page.getByRole("textbox", {name:"password"}).click();
    await page.getByRole("textbox", {name:"password"}).fill('test');
    await page.locator('div.login-form input[name="email"]').fill('test13@mail.com');
    await page.locator('div.login-form input[name="password"]').fill('test');
    */
    
    await page.locator('[data-qa="login-email"]').fill(config.email);
    await page.locator('[data-qa="login-password"]').fill(config.password);

//Click 'login' button
    //await page.getByRole("button", {name:"Login"}).click();
    //await page.locator('div.login-form button[type="submit"]').click();
    await page.locator('[data-qa="login-button"]').click();

//Verify that 'Logged in as username' is visible
    //await expect(page.locator('.container')).toBeVisible;
    //await expect(page.getByText('Logged in as TEST')).toBeVisible();
    // await page.getByText('Logged in as TEST');
    //await expect (page.locator('li', {hasText: " Logged in as "})).toBeVisible();

    const userName = "TEST";
    await expect( page.locator('a:has(i.fa-user)')).toContainText(` Logged in as ${userName}`);

//Click 'Logout' button
    //await page.getByRole('link', { name: ' Logout' }).click();
    //await page.locator('ul.navbar-nav a[href="/logout"]').click();
    await page.locator('.fa-lock').click();

//Verify that user is navigated to login page
    await expect(page).toHaveURL('https://automationexercise.com/login');

});