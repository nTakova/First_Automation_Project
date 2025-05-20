import { test, expect } from '@playwright/test';
import { config } from './config';
test ('Order - register before checkout', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

//Verify that home page is visible successfully
    await expect(page.locator('.navbar-nav')).toBeVisible();

//Click on Login button
    await page.locator('i.fa-lock').click();

//Verify 'New User Signup!' is visible
    expect (await page.locator('div.signup-form')).toBeVisible();

//Enter name and email address
    const userName = "TEST";
    await page.locator('[data-qa="signup-name"]').fill(userName);
    await page.locator('[data-qa="signup-email"]').fill(config.email15);

//Click 'Signup' button
    await page.locator('[data-qa="signup-button"]').click();

//Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.locator('div.login-form')).toBeVisible();

//Fill details: Title, Name, Email, Password, Date of birth

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

//Verify ' Logged in as username' at top
    const icon= await (page.locator('a').filter({has: page.locator('i.fa-user')})).textContent();
    console.log(icon);
    await expect(icon).toBe(` Logged in as ${userName}`);

//Add products to cart 
    await page.locator('ul.navbar-nav a[href="/products"]').click();
    const firstItem = page.locator ('.product-image-wrapper').filter({has:page.locator('[data-product-id="1"]')});
    await firstItem.hover();
    const addToCart= page.locator('.overlay-content').filter({has:page.locator('[data-product-id="1"]')});
    const cartButton = addToCart.locator('i.fa-shopping-cart');
    await cartButton.click();

//Click 'Continue
    await expect (page.locator('#cartModal')).toBeVisible();
    await page.locator('.btn-block').click();

//second product and click 'Add to cart'
    const secondItem = page.locator ('.product-image-wrapper').filter({has:page.locator('[data-product-id="2"]')});
    await secondItem.hover();
    const addToCart2= page.locator('.overlay-content').filter({has:page.locator('[data-product-id="2"]')});
    const cartButton2 = addToCart2.locator('.fa-shopping-cart');
    await cartButton2.click();

//Click 'View Cart' button
    await expect (page.locator('#cartModal')).toBeVisible();
    const viewCart = page.locator('.modal-body a[href="/view_cart"]');
    await viewCart.click();

//Verify that cart page is displayed
    await expect (page).toHaveURL('https://automationexercise.com/view_cart');

//Click Proceed To Checkout
    await page.locator('.btn-default.check_out').click();

//Verify Address Details and Review Your Order
    await expect(page.locator('.step-one').filter({hasText: "Address Details"})).toBeVisible();

// Enter description in comment text area and click 'Place Order'
    await page.locator('.form-control').fill('order this clothes');
    await page.locator('.check_out').click();

//Enter payment details: Name on Card, Card Number, CVC, Expiration date

    await expect(page.locator('.step-one').filter({hasText: "Payment"})).toBeVisible();
    await page.locator('[data-qa="name-on-card"]').fill('test test');
    await page.locator('[data-qa="card-number"]').fill('testtest');
    await page.locator('[data-qa="cvc"]').fill('tst');
    await page.locator('[data-qa="expiry-month"]').fill('mm');
    await page.locator('[data-qa="expiry-year"]').fill('yyyy');

//Click 'Pay and Confirm Order' button
//await page.waitForTimeout(5000);
   // await page.waitForTimeout(5000);

//Verify success message 'Your order has been placed successfully!'
    //await expect(page.locator('#success_message')).toBeVisible({ timeout: 5000 });
    //await page.pause();
    //await expect(page.locator('#success_message')).toContainText('Your order has been placed successfully!', { timeout: 5000 });
    //await page.locator('#success_message').waitFor({state: 'visible'});
    //await expect(page.locator('#success_message')).toContainText('Your order has been placed successfully!', { timeout: 5000 });
/*
await page.locator('[data-qa="pay-button"]').click({ noWaitAfter: true });
await page.locator('#success_message').waitFor({ state: 'visible', timeout: 5000 });
await expect(page.locator('#success_message')).toContainText('Your order has been placed successfully!');


const navigationPromise = page.waitForNavigation({ waitUntil: 'load' });
await page.click('[data-qa="pay-button"]');
await page.waitForSelector('#success_message', { state: 'attached' });
const messageText = await page.textContent('Your order has been placed successfully!');
console.log('Success message:', messageText);
await navigationPromise;
*/
const [messageText] = await Promise.all([
    page.locator('#success_message').textContent(), // хващаме текста веднага
    page.click('[data-qa="pay-button"]'), // кликът, който задейства и съобщението, и навигацията
    page.waitForLoadState() // изчакваме навигацията след това
  ]);
   
  console.log('Success message:', messageText);
//Click 'Delete Account' button
    //await page.locator('ul.navbar-nav a[href="/delete_account"]').click();
    await page.locator('.fa-trash-o').click();

//Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    //await expect(page.getByText('Account Deleted')).toBeVisible();
    //await page.getByText('Account Deleted');
    //await page.getByRole('link', { name: 'Continue' }).click();       
  await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
  await page.locator('.btn[data-qa="continue-button"]').click();

});



