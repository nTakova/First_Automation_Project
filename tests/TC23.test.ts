import { test, expect, Locator } from '@playwright/test';
import { config } from './config';

test('Verify address details in checkout page', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //home page is opened
    //await expect(page.locator('.navbar-nav')).toBeVisible();
    await expect(page.locator('#slider')).toBeVisible();

    //click on Login button
    await page.locator('i.fa-lock').click();

    //Verify 'New User Signup!' is visible
    expect(await page.locator('div.signup-form')).toBeVisible();

    //Enter name and email address
    await page.locator('input[data-qa="signup-name"]').fill(config.userName);
    await page.locator('input[data-qa="signup-email"]').fill(config.email23);

    //Click 'Signup' button
    await page.locator('[data-qa="signup-button"]').click();

    //Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.locator('div.login-form')).toContainText('Enter Account Information');

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

    //Verify that 'Logged in as username' is visible
    const userName: string = "TEST";
    const valueUserName: string | null = await (page.locator('a:has(i.fa-user)').textContent());
    const trimmedValue: string = (valueUserName as string).trim();
    await expect(trimmedValue).toBe(`Logged in as ${userName}`);

    //click Products button
    await page.locator('.card_travel').click();

    //Add products to cart 
    await page.locator('ul.navbar-nav a[href="/products"]').click();


    const productCard: Locator = page.locator('.product-image-wrapper')
        .filter({
            has: page.locator('[data-product-id="1"]'),
        });
    await productCard.hover();

    const overlayContent: Locator = productCard.locator('.overlay-content')
        .filter({ has: page.locator('[data-product-id="1"]') });
    const addToCartButton = overlayContent.locator('.fa-shopping-cart');

    await addToCartButton.click();

    //Click 'Continue Shopping' button
    await expect(page.locator('#cartModal')).toBeVisible();
    await page.locator('.btn-block').click();

    //Hover over second product and click 'Add to cart'

    const productCard2: Locator = page.locator('.product-image-wrapper')
        .filter({
            has: page.locator('[data-product-id="2"]'),
        });
    await productCard2.hover();

    const overlayContent2: Locator = productCard2.locator('.overlay-content')
        .filter({ has: page.locator('[data-product-id="2"]') });
    const addToCartButton2 = overlayContent2.locator('.fa-shopping-cart');
    await addToCartButton2.click();

    const firstProduct: Locator = page.locator('.single-products').first();

    //Click 'Cart' button
    await page.locator('.navbar-nav a[href="/view_cart"]').click();

    //Verify that cart page is displayed
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');

    //Click Proceed To Checkout
    await page.locator('.btn-default.check_out').click();

    //Verify that the delivery address is same address filled at the time registration of account

    //променливи за данните, които се попълват в логин формата, след това - срявняване на данните - expect to be
    //извличане на данните от формата, сравняване с попълнените 

    const firstNameValue: string | null = await page.locator('#address_delivery .address_firstname').textContent();
    expect(firstNameValue).toContain(`Mrs. ${firstName} ${lastName}`);

    //company
    const companyValue: string | null = await page.locator('#address_delivery .address_address1.address_address2').first().innerText();
    expect(companyValue).toContain(company);

    //address1
    const addressValue: string | null = await page.locator('#address_delivery .address_address1.address_address2').nth(1).innerText();
    expect(addressValue).toContain(address1);

    //address2
    const addressValue2: string | null = await page.locator('#address_delivery .address_address1.address_address2').last().innerText();
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


    //Verify Address Details and Review Your Order
    await expect(page.locator('.step-one').filter({ hasText: "Address Details" })).toBeVisible();
    // ще го заменя с toContainText("Address Details"/ "Review your order"), но има два едни и същи локатора? h2 class heading

    //Click 'Delete Account' button
    await page.locator('a:has(i.fa-trash-o)').click();

    //Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.locator('[data-qa="account-deleted"]')).toContainText('Account Deleted');
    await page.locator('.btn[data-qa="continue-button"]').click();

});