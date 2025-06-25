
import { test, expect, Locator } from '@playwright/test';
import path from 'path';
import * as fs from 'fs';
import { config } from 'process';

test('Add to Shopping cart', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //block adds
    await page.route('**/*adsbygoogle*', route => route.abort());

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //допълнително правя проверка за дейтайлите на продукта -> view product
    await page.locator('.product-image-wrapper').locator('i.fa-plus-square').first().click();
    const productDescription: string = (await page.locator('.product-information h2').textContent())!;
    const productPrice: string = (await page.locator('.product-information span span').textContent())!;

    await page.locator('a', { has: page.locator('i.card_travel') }).click();

    await page.locator('.product-image-wrapper').locator('i.fa-plus-square').nth(1).click();
    const productDescription2: string = (await page.locator('.product-information h2').textContent())!;
    const productPrice2: string = (await page.locator('.product-information span span').textContent())!;

    //Add products to cart 
    await page.locator('ul.navbar-nav a[href="/products"]').click();

    await page.locator('a', { has: page.locator('i.card_travel') }).click();
    const firstItem: Locator = page.locator('.product-image-wrapper').filter({ has: page.locator('a[data-product-id="1"]') });
    await firstItem.hover();
    firstItem.locator('.overlay-content').locator('a[data-product-id="1"]').click();

    //Click 'Continue Shopping' button
    await expect(page.locator('#cartModal')).toBeVisible();
    await page.locator('.btn-block').click();

    //Hover over second product and click 'Add to cart'
    await page.locator('a', { has: page.locator('i.card_travel') }).click();
    const secondItem: Locator = page.locator('.product-image-wrapper').filter({ has: page.locator('a[data-product-id="2"]') });
    await secondItem.hover();
    await secondItem.locator('.overlay-content').locator('a[data-product-id="2"]').click();

    //Click 'View Cart' button
    await page.locator('a[href="/view_cart"]', {
        has: page.locator('i.fa-shopping-cart')
    }).filter({
        hasText: 'Cart'
    }).click();

    //Verify that cart page is displayed
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');

    const productCartQuantity: string = (await page.locator('#product-1 .cart_quantity').textContent())!.trim();
    const productTotalPrice: string = (await page.locator('#product-1 .cart_total_price').textContent())!.trim();
    const productCartQuantity2: string = (await page.locator('#product-2 .cart_quantity').textContent())!.trim();
    const productTotalPrice2: string = (await page.locator('#product-2 .cart_total_price').textContent())!.trim();

    //Click Proceed To Checkout
    await page.locator('.btn-default.check_out').click();

    //Click 'Register / Login' button
    await page.locator('.text-center u', { hasText: 'Register / Login' }).click();

    const userName: string = "TEST";
    const email: string = "testTuesday1@qa.test24";

    //Fill all details in Signup and create account
    await expect(page.locator('div.signup-form h2')).toHaveText("New User Signup!");

    //Enter name and email address
    await page.locator('input[data-qa="signup-name"]').fill(userName);
    await page.locator('input[data-qa="signup-email"]').fill(email);

    //Click 'Signup' button
    await page.locator('button[data-qa="signup-button"]').click();

    //Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.locator('div.login-form h2', { hasText: 'Enter Account Information' })).toHaveText('Enter Account Information');

    //Fill details: Title, Name, Email, Password, Date of birth

    await expect(page.locator('#name')).toHaveValue(userName);
    await expect(page.locator('#email')).toHaveValue(email);

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
    const firstName: string = "test";
    await page.locator('#first_name').fill(firstName);
    const lastName: string = "test";
    await page.locator('#last_name').fill(lastName);
    const company: string = "company";
    await page.locator('#company').fill(company);
    const address1: string = "adr1";
    await page.locator('#address1').fill(address1);
    const address2: string = "adr2";
    await page.locator('#address2').fill(address2);
    const country: string = "Canada";
    await page.locator('#country').selectOption(country);
    const state: string = "state";
    await page.locator('#state').fill(state);
    const city: string = "city";
    await page.locator('#city').fill(city);
    const zipCode: string = "1234";
    await page.locator('#zipcode').fill("1234");
    const mobile: string = "1234";
    await page.locator('#mobile_number').fill(mobile);

    //Click 'Create Account button'
    await page.locator('button[data-qa="create-account"]').click();

    //Verify that 'ACCOUNT CREATED!' is visible
    await expect(page.locator('h2[data-qa="account-created"]')).toHaveText('Account Created!');

    //Click 'Continue' button
    await page.locator('a[data-qa="continue-button"]').click();

    //Verify that 'Logged in as username' is visible
    const valueUserName: string = (await page.locator("a", { has: page.locator("i.fa-user") }).textContent())!.trim();
    await expect(valueUserName).toBe(`Logged in as ${userName}`);

    //Click 'Cart' button
    await page.locator('a[href="/view_cart"]', {
        has: page.locator('i.fa-shopping-cart')
    }).filter({
        hasText: 'Cart'
    }).click();

    //Click Proceed To Checkout
    await page.locator('.btn-default.check_out').click();

    //Verify Address Details and Review Your Order

    const firstNameValue: string = (await page.locator('#address_delivery .address_firstname').textContent())!;
    expect(firstNameValue).toBe(`Mrs. ${firstName} ${lastName}`);

    //company
    const companyValue: string = (await page.locator('#address_delivery .address_address1.address_address2').first().innerText())!;
    expect(companyValue).toBe(company);

    //address1
    const addressValue: string = (await page.locator('#address_delivery .address_address1.address_address2').nth(1).innerText())!;
    expect(addressValue).toBe(address1);

    //address2
    const addressValue2: string = (await page.locator('#address_delivery .address_address1.address_address2').last().innerText())!;
    expect(addressValue2).toBe(address2);

    const zipCodeValue: string = (await page.locator('#address_delivery .address_postcode').textContent())!;
    const cleanZipCode: string = (zipCodeValue as string).replace(/\s+/g, ' ').trim();
    expect(cleanZipCode).toBe(`${city} ${state} ${zipCode}`);

    const countryValue: string = (await page.locator('#address_delivery .address_country_name').textContent())!;
    expect(countryValue).toBe(country);

    const mobileValue: string = (await page.locator('#address_delivery .address_phone').textContent())!;
    expect(mobileValue).toBe(mobile);


    //Verify that the billing address is same address filled at the time registration of account
    const firstNameValue2: string = (await page.locator('#address_invoice .address_firstname').textContent())!;
    expect(firstNameValue2).toBe(`Mrs. ${firstName} ${lastName}`);

    const zipCodeValue2: string = (await page.locator('#address_invoice .address_postcode').textContent())!;
    const cleanZipCode2: string = ((zipCodeValue2 as string).replace(/\s+/g, ' ').trim())!;
    expect(cleanZipCode2).toBe(`${city} ${state} ${zipCode}`);

    const countryValue2: string = (await page.locator('#address_invoice .address_country_name').textContent())!;
    expect(countryValue2).toBe(country);

    const mobileValue2: string = (await page.locator('#address_invoice .address_phone').textContent())!;
    expect(mobileValue2).toBe(mobile);


    //Verify Review Your Order
    await expect(page.locator('.step-one .heading').last()).toHaveText("Review Your Order");

    const cartTableRows: number = await page.locator('tbody tr[id^="product-"]').count();
    expect(cartTableRows).toEqual(2);

    const cartTableProduct1: Locator = page.locator('tbody tr[id="product-1"]');

    const cartDescription: string = (await cartTableProduct1.locator('.cart_description h4').textContent())!.trim();
    //const cartPrice: string = (await cartTableProduct1.locator('.cart_price').textContent())!.trim();
    const rawTextPrice = await cartTableProduct1.locator('.cart_price').textContent();
    const cartPrice: string = rawTextPrice ? rawTextPrice.replace(/\s+/g, '') : '';

    //const cartQuantity: string = (await cartTableProduct1.locator('.cart_quantity').textContent())!.trim();
    const rawTextQuantity = await cartTableProduct1.locator('.cart_quantity').textContent();
    const cartQuantity: string = rawTextQuantity ? rawTextQuantity.replace(/\s+/g, '') : '';

    const cartTotal: string = (await cartTableProduct1.locator('.cart_total').textContent())!.trim();

    expect(cartDescription).toBe(productDescription);
    //expect(cartPrice).toBe(productPrice);
    console.log(cartPrice);
    console.log(productPrice);
    expect(cartQuantity).toBe(productCartQuantity);
    expect(cartTotal).toBe(productTotalPrice);


    const cartTableProduct2: Locator = page.locator('tbody tr[id="product-2"]');

    const cartDescription2: string = (await cartTableProduct2.locator('.cart_description h4').textContent())!.trim();
    //const cartPrice2: string = (await cartTableProduct2.locator('.cart_price').textContent())!.trim();
    const rawTextPrice2 = await cartTableProduct2.locator('.cart_price').textContent();
    const cartPrice2: string = rawTextPrice2 ? rawTextPrice2.replace(/\s+/g, '') : '';

    //const cartQuantity2: string = (await cartTableProduct2.locator('.cart_quantity').textContent())!.trim();
    const rawTextQuantity2 = await cartTableProduct2.locator('.cart_quantity').textContent();
    const cartQuantity2: string = rawTextQuantity2 ? rawTextQuantity2.replace(/\s+/g, '') : '';

    const cartTotal2: string = (await cartTableProduct2.locator('.cart_total').textContent())!.trim();

    expect(cartDescription2).toBe(productDescription2);
    //expect(cartPrice2).toBe(productPrice2);
    expect(cartQuantity2).toBe(productCartQuantity2);
    expect(cartTotal2).toBe(productTotalPrice2);

    // Enter description in comment text area and click 'Place Order'
    await page.locator('.form-control').fill('order this clothes');
    await page.locator('.check_out').click();

    //Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await expect(page.locator('.step-one').filter({ hasText: "Payment" })).toBeVisible();
    await page.locator('input[data-qa="name-on-card"]').fill('test test');
    await page.locator('input[data-qa="card-number"]').fill('testtest');
    await page.locator('input[data-qa="cvc"]').fill('tst');
    await page.locator('input[data-qa="expiry-month"]').fill('mm');
    await page.locator('input[data-qa="expiry-year"]').fill('yyyy');

    //Click 'Pay and Confirm Order' button
    //await page.locator('[data-qa="pay-button"]').click();

    //Verify success message 'Your order has been placed successfully!'
    const [messageText] = await Promise.all([
        page.locator('#success_message').textContent(), // хващаме текста веднага
        page.click('button[data-qa="pay-button"]'), // кликът, който задейства и съобщението, и навигацията
        page.waitForLoadState() // изчакваме навигацията след това
    ]);
    expect(messageText?.trim()).toBe('Your order has been placed successfully!');

    //Click 'Download Invoice' button and verify invoice is downloaded successfully.
    const downloadPromise = page.waitForEvent('download');
    await page.locator('.check_out').click();
    const download = await downloadPromise;

    await download.saveAs('./' + download.suggestedFilename());
    const fileCheck = fs.existsSync('./');
    expect(fileCheck).toBeTruthy();

    //Click 'Continue' button
    await page.locator('.btn-primary').click();

    //Click 'Delete Account' button
    await page.locator('a', { has: page.locator('i.fa-trash-o') }).click();

    //Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.locator('h2[data-qa="account-deleted"]')).toHaveText('Account Deleted!');
    await page.locator('a[data-qa="continue-button"]').click();

});