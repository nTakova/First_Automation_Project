import { test, expect } from '@playwright/test';
import { config } from './config';

test ('Existing email', async ({page}) => {
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

//Verify 'New User Signup!' is visible
    //expect (await page.getByText("New User Signup!")).toBeVisible();
    expect (await page.locator('div.signup-form')).toBeVisible();
    
//Enter name and already registered email address
    /*
    await page.getByPlaceholder("Name").click();
    await page.getByPlaceholder("Name").fill('TEST');
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('testcase4@test.bg');
    
    await page.locator('div.signup-form input[name="name"]').fill('TEST');
    await page.locator('div.signup-form input[name="email"]').fill('testcase4@test.bg');
    */
   
    await page.locator('[data-qa="signup-name"]').fill('test');
    await page.locator('[data-qa="signup-email"]').fill(config.email);

//Click 'Signup' button
    //await page.getByRole('button', { name: 'Signup' }).click();
    //await page.locator('div.signup-form button[type="submit"]').click();
    await page.locator('[data-qa="signup-button"]').click();


//Verify error 'Email Address already exist!' is visible
    //await page.getByText('Email Address already exist!');
    //await expect (page.getByText('Email Address already exist!')).toBeVisible();
    await expect (page.locator('p[style="color: red;"]')).toBeVisible();

});
