import { test, expect } from '@playwright/test';
import { config } from './config';

test ('Delete account', async ({page}) => {
    await page.goto('https://automationexercise.com/');

//Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();
   
//Home page
    //await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).nth(3)).toBeVisible();
    //await expect(page.locator('.container')).toBeVisible;
    //await expect(page.locator('ul.nav.navbar-nav')).toBeVisible();
    await expect(page.locator('.navbar-nav')).toBeVisible();
    
//Click on login button
    //await page.getByRole('link', { name: ' Signup / Login' }).click()
    //await page.locator('ul.navbar-nav a[href="/login"]').click();
    await page.locator('i.fa-lock').click();

//Verify 'Login to your account' is visible
    //await expect(page.getByText("Login to your account")).toBeVisible();
    await expect (page.locator('div.login-form')).toBeVisible();

//Enter correct email address and password
    /*
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('testcase5@test.bg');
    await page.getByRole("textbox", {name:"password"}).click();
    await page.getByRole("textbox", {name:"password"}).fill('test');
    
    await page.locator('div.login-form input[name="email"]').fill('122o@mail.m');
    await page.locator('div.login-form input[name="password"]').fill('test');
    */
    const email = "test@qa.2";
    await page.locator('[data-qa="login-email"]').fill(email);
    await page.locator('[data-qa="login-password"]').fill(config.password);

//Click 'login' button
    //await page.getByRole("button", {name:"Login"}).click();
    //await page.locator('div.login-form button[type="submit"]').click();
    await page.locator('[data-qa="login-button"]').click();

//Verify that 'Logged in as username' is visible
    //await expect(page.getByText('Logged in as TEST')).toBeVisible();
    //await page.getByText('Logged in as TEST');
    const userName = "TEST"
    const icon= await (page.locator('a').filter({has: page.locator('i.fa-user')})).textContent();
    console.log(icon);
    await expect(icon).toBe(` Logged in as ${userName}`);

    //await expect (page.locator('li', {hasText: " Logged in as "})).toBeVisible();

//Click 'Delete Account' button
    //await page.getByRole("link", {name:"Delete Account"}).click();
    //await page.locator('ul.navbar-nav a[href="/delete_account"]').click();
    await page.locator('.fa-trash-o').click();

//Verify that 'ACCOUNT DELETED!' is visible
    //await expect(page.getByText('Account Deleted')).toBeVisible();
    //await page.getByText('Account Deleted');
    //await expect(page.locator('col-sm-9')).toBeVisible();
    await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
    await page.locator('.btn[data-qa="continue-button"]').click();


});
