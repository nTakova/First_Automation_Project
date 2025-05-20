import { test, expect } from '@playwright/test';
import { config } from './config';

test ('Verify address details in checkout page', async ({page}) => {
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
    await page.locator('[data-qa="signup-name"]').fill(config.userName);
    await page.locator('[data-qa="signup-email"]').fill(config.email23);

//Click 'Signup' button
    await page.locator('[data-qa="signup-button"]').click();

//Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.locator('div.login-form')).toBeVisible();

//Fill details: Title, Name, Email, Password, Date of birth
    await page.locator('#uniform-id_gender2').click();
    await page.locator('#password').fill('test');

//date of birth
    await page.locator('#days').selectOption('17');
    await page.locator('#months').selectOption('December');
    await page.locator('#years').selectOption('2020');

//Select checkbox 'Sign up for our newsletter!'
    await page.locator('#newsletter').check();

//Select checkbox 'Receive special offers from our partners!'
    await page.locator('#optin').check();

//Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    const firstName= "test";
    await page.locator('#first_name').fill(firstName);
    const lastName = "test";
    await page.locator('#last_name').fill(lastName);
    const company = "company";
    await page.locator('#company').fill(company);
    const address1 = "adr1";
    await page.locator('#address1').fill(address1);
    const address2 = "adr2";
    await page.locator('#address2').fill(address2);
    const country = "Canada";
    await page.locator('#country').selectOption(country);
    const state= "state";
    await page.locator('#state').fill(state);
    const city= "city";
    await page.locator('#city').fill(city);
    const zipCode= "1234";
    await page.locator('#zipcode').fill("1234");
    const mobile= "1234";
    await page.locator('#mobile_number').fill(mobile);

//Click 'Create Account button'
    await page.locator('button[data-qa="create-account"]').click();

//Verify that 'ACCOUNT CREATED!' is visible
    await expect(page.locator('[data-qa="account-created"]')).toBeVisible();

//Click 'Continue' button
    await page.locator('.btn[data-qa="continue-button"]').click();

//Verify that 'Logged in as username' is visible
    const icon= await (page.locator('a').filter({has: page.locator('i.fa-user')})).textContent();
    //console.log(icon);
    await expect(icon).toBe(` Logged in as ${config.userName}`);

//click Products button
    //await page.locator('ul.navbar-nav a[href="/products"]').click();
    await page.locator('.card_travel').click();

//Add products to cart
    const firstItem = page.locator ('.product-image-wrapper').filter({has:page.locator('[data-product-id="1"]')});
    await firstItem.hover();
    const addToCart= page.locator('.overlay-content').filter({has:page.locator('[data-product-id="1"]')});
    const cartButton = addToCart.locator('.fa-shopping-cart');
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

//Click 'Cart' button
    await page.locator('.navbar-nav a[href="/view_cart"]').click();

//Verify that cart page is displayed

//Click Proceed To Checkout
    await page.locator('.btn-default.check_out').click();

//Verify that the delivery address is same address filled at the time registration of account

//променливи за данните, които се попълват в логин формата, след това - срявняване на данните - expect to be
//извличане на данните от формата, сравняване с попълнените 

const firstNameValue = await page.locator('#address_delivery .address_firstname').textContent();
expect (firstNameValue).toContain(`Mrs. ${firstName} ${lastName}`);

//company
const companyValue = await page.locator('#address_delivery .address_address1.address_address2').first().innerText();
expect (companyValue).toContain(company);
//const cleanAddress = address.trim(); //.replace(/\s+/g, ' ')
//const cleanAddress = address.map( text => text.trim());
//expect (address).toContain(` ${address1} ${address2}`);

//address1
const addressValue = await page.locator('#address_delivery .address_address1.address_address2').nth(1).innerText();
expect (addressValue).toContain(address1);

//address2
const addressValue2 = await page.locator('#address_delivery .address_address1.address_address2').last().innerText();
expect (addressValue2).toContain(address2);

const zipCodeValue = await page.locator('#address_delivery .address_postcode').textContent();
const cleanZipCode = zipCodeValue.replace(/\s+/g, ' ').trim();
expect (cleanZipCode).toContain(`${city} ${state} ${zipCode}`);

const countryValue = await page.locator('#address_delivery .address_country_name').textContent();
expect (countryValue).toContain(country); 

const mobileValue = await page.locator('#address_delivery .address_phone').textContent();
expect (mobileValue).toContain(mobile); 


//Verify that the billing address is same address filled at the time registration of account
const firstNameValue2 = await page.locator('#address_invoice .address_firstname').textContent();
expect (firstNameValue2).toContain(`Mrs. ${firstName} ${lastName}`);

const zipCodeValue2 = await page.locator('#address_invoice .address_postcode').textContent();
const cleanZipCode2 = zipCodeValue2.replace(/\s+/g, ' ').trim();
expect (cleanZipCode2).toContain(`${city} ${state} ${zipCode}`);

const countryValue2 = await page.locator('#address_invoice .address_country_name').textContent();
expect (countryValue2).toContain(country); 

const mobileValue2 = await page.locator('#address_invoice .address_phone').textContent();
expect (mobileValue2).toContain(mobile);


//Verify Address Details and Review Your Order
    await expect(page.locator('.step-one').filter({hasText: "Address Details"})).toBeVisible();

//Click 'Delete Account' button
    await page.locator('.fa-trash-o').click();

//Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
    await page.locator('.btn[data-qa="continue-button"]').click();

});