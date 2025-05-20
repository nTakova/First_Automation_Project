import { test, expect } from '@playwright/test';
import { config } from './config';

test ('Create account', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();
    
//home page is opened
    await expect(page.locator('.navbar-nav')).toBeVisible();
   
//click on Login button
    await page.locator('i.fa-lock').click();

//Verify 'New User Signup!' is visible
    expect (await page.locator('div.signup-form')).toBeVisible();

//Enter name and email address
    //await page.locator('[data-qa="signup-name"]').fill('TEST');
    const userName = "TEST";
    const email = config.email;
    await page.locator('[data-qa="signup-name"]').fill(userName);
    await page.locator('[data-qa="signup-email"]').fill(email);

//Click 'Signup' button
    await page.locator('[data-qa="signup-button"]').click();

//Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.locator('div.login-form')).toBeVisible();

//Fill details: Title, Name, Email, Password, Date of birth
    //да се направи проверка дали name & email са попълнени със същите данни
    await page.locator('#uniform-id_gender2').click();
    await page.locator('#password').fill(config.password);

//date of birth
    await page.locator('#days').selectOption('17');
    await page.locator('#months').selectOption('December');
    await page.locator('#years').selectOption('2020');

//Select checkbox 'Sign up for our newsletter!'
    await page.locator('#newsletter').check();

//Select checkbox 'Receive special offers from our partners!'
    await page.locator('#optin').check();

//Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    await page.locator('#first_name').fill("test");
    await page.locator('#last_name').fill("test");
    await page.locator('#company').fill("test");
    await page.locator('#address1').fill("test");
    await page.locator('#address2').fill("test");
    await page.locator('#country').selectOption('Canada');
    await page.locator('#state').fill("test");
    await page.locator('#city').fill("test");
    await page.locator('#zipcode').fill("1234");
    await page.locator('#mobile_number').fill("1234");

//Click 'Create Account button'
    await page.locator('button[data-qa="create-account"]').click();

//Verify that 'ACCOUNT CREATED!' is visible
    await expect(page.locator('[data-qa="account-created"]')).toBeVisible();

//Click 'Continue' button
    await page.locator('.btn[data-qa="continue-button"]').click();

//Verify that 'Logged in as username' is visible
    const icon= await (page.locator('a').filter({has: page.locator('i.fa-user')})).textContent();
    console.log(icon);
    await expect(icon).toBe(` Logged in as ${userName}`);

/* закоментирам изтриването на аканута, за да го използвам за следващите тестове 

//Click 'Delete Account' button
    //await page.locator('a', {hasText: " Delete Account"}).click();
    //през иконката, след това се връщам на а елеменрта и го кликам
    await page.locator('.fa-trash-o').click();

//Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
    await page.locator('.btn[data-qa="continue-button"]').click();
    
*/

});
