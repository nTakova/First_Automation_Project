import { test, expect, Locator } from '@playwright/test';
import { config } from './config';

test('Order - register while checkout', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //click Products button
    await page.locator('.card_travel').click();

    //Add products to cart 
    const firstItem: Locator = page.locator('.product-image-wrapper').filter({ has: page.locator('[data-product-id="1"]') });
    await firstItem.hover();
    const addToCart: Locator = page.locator('.overlay-content').filter({ has: page.locator('[data-product-id="1"]') });
    const cartButton: Locator = addToCart.locator('.fa-shopping-cart');
    await cartButton.click();

    //Click 'Continue
    await expect(page.locator('#cartModal')).toBeVisible();
    await page.locator('.btn-block').click();

    //second product and click 'Add to cart'
    const secondItem: Locator = page.locator('.product-image-wrapper').filter({ has: page.locator('[data-product-id="2"]') });
    await secondItem.hover();
    const addToCart2: Locator = page.locator('.overlay-content').filter({ has: page.locator('[data-product-id="2"]') });
    const cartButton2: Locator = addToCart2.locator('.fa-shopping-cart');
    await cartButton2.click();

    //Click 'View Cart' button
    await expect(page.locator('#cartModal')).toBeVisible();
    const viewCart: Locator = page.locator('.modal-body a[href="/view_cart"]');
    await viewCart.click();

    //Verify that cart page is displayed
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');

    //Click Proceed To Checkout
    await page.locator('.btn-default.check_out').click();

    //Click 'Register / Login' button
    await expect(page.locator('#checkoutModal')).toBeVisible();
    const checkOutCart: Locator = page.locator('.modal-body a[href="/login"]');
    await checkOutCart.click();

    //Verify 'New User Signup!' is visible
    expect(await page.locator('div.signup-form')).toContainText('New User Signup!');

    //the code below is as in the Login.test.ts; should be updated
    //Enter name and email address
    const userName: string = "TEST";
    const email: string = config.email;
    await page.locator('input[data-qa="signup-name"]').fill(userName);
    await page.locator('input[data-qa="signup-email"]').fill(email);

    //Click 'Signup' button
    await page.locator('button[data-qa="signup-button"]').click();

    //Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.locator('div.login-form')).toContainText('Enter Account Information');

    //Fill details: Title, Name, Email, Password, Date of birth
    const inputName: string | null = await page.locator('#name').inputValue();
    console.log(inputName);
    await expect(inputName).toBe(userName);

    const inputEmail: string | null = await page.locator('#email').inputValue();
    console.log(inputEmail);
    await expect(inputEmail).toBe(email);

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
    await expect(page.locator('h2[data-qa="account-created"]')).toContainText('Account Created!');

    //Click 'Continue' button
    await page.locator('.btn[data-qa="continue-button"]').click();

    //Verify ' Logged in as username' at top
    const valueUserName: string | null = await (page.locator('a:has(i.fa-user)').textContent());
    const trimmedValue: string = (valueUserName as string).trim();
    await expect(trimmedValue).toBe(`Logged in as ${userName}`);

    //Click 'Cart' button
    await page.locator('.navbar-nav a[href="/view_cart"]').click();

    //Click Proceed To Checkout
    await page.locator('.btn-default.check_out').click();

    //Verify Address Details and Review Your Order
    await expect(page.locator('.step-one').filter({ hasText: "Address Details" })).toBeVisible();

    const firstNameValue: string | null = await page.locator('#address_delivery .address_firstname').textContent();
    expect(firstNameValue).toContain(`Mrs. ${firstName} ${lastName}`);

    //company
    const companyValue: string = await page.locator('#address_delivery .address_address1.address_address2').first().innerText();
    expect(companyValue).toContain(company);

    //address1
    const addressValue: string = await page.locator('#address_delivery .address_address1.address_address2').nth(1).innerText();
    expect(addressValue).toContain(address1);

    //address2
    const addressValue2: string = await page.locator('#address_delivery .address_address1.address_address2').last().innerText();
    expect(addressValue2).toContain(address2);

    const zipCodeValue: string | null = await page.locator('#address_delivery .address_postcode').textContent();
    const cleanZipCode: string = (zipCodeValue as string).replace(/\s+/g, ' ').trim();
    expect(cleanZipCode).toContain(`${city} ${state} ${zipCode}`);

    const countryValue: string | null = await page.locator('#address_delivery .address_country_name').textContent();
    expect(countryValue).toContain(country);

    const mobileValue: string | null = await page.locator('#address_delivery .address_phone').textContent();
    expect(mobileValue).toContain(mobile);

    //Verify that the billing address is same address filled at the time registration of account
    const firstNameValue2: string | null = await page.locator('#address_invoice .address_firstname').textContent();
    expect(firstNameValue2).toContain(`Mrs. ${firstName} ${lastName}`);

    const zipCodeValue2: string | null = await page.locator('#address_invoice .address_postcode').textContent();
    const cleanZipCode2: string | null = (zipCodeValue2 as string).replace(/\s+/g, ' ').trim();
    expect(cleanZipCode2).toContain(`${city} ${state} ${zipCode}`);

    const countryValue2: string | null = await page.locator('#address_invoice .address_country_name').textContent();
    expect(countryValue2).toContain(country);

    const mobileValue2: string | null = await page.locator('#address_invoice .address_phone').textContent();
    expect(mobileValue2).toContain(mobile);


    // Enter description in comment text area and click 'Place Order'
    await page.locator('.form-control').fill('order this clothes');
    await page.locator('.check_out').click();

    //Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await expect(page.locator('.step-one').filter({ hasText: "Payment" })).toBeVisible();
    await page.locator('[data-qa="name-on-card"]').fill('test test');
    await page.locator('[data-qa="card-number"]').fill('testtest');
    await page.locator('[data-qa="cvc"]').fill('tst');
    await page.locator('[data-qa="expiry-month"]').fill('mm');
    await page.locator('[data-qa="expiry-year"]').fill('yyyy');

    //Click 'Pay and Confirm Order' button
    //Verify success message 'Your order has been placed successfully!'
    const [messageText] = await Promise.all([
        page.locator('#success_message').textContent(), // хващаме текста веднага
        page.click('[data-qa="pay-button"]'), // кликът, който задейства и съобщението, и навигацията
        page.waitForLoadState() // изчакваме навигацията след това
    ]);

    console.log('Success message:', messageText);
    //Click 'Delete Account' button
    await page.locator('.fa-trash-o').click();

    //Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button    
    await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
    await page.locator('.btn[data-qa="continue-button"]').click();

});