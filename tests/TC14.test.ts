import { test, expect, Locator } from '@playwright/test';
import { config } from './config';

test('Order - register while checkout', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //block adds
    await page.route('**/*adsbygoogle*', route => route.abort());

    //Verify that home page is visible successfully
    await expect(page.locator('#slider')).toBeVisible();

    //Click Products button
    await page.locator('a', { has: page.locator('i.card_travel') }).click();

    //допълнително правя проверка за дейтайлите на продуктите 1 и 2 -> view product
    await page.locator('div.product-image-wrapper').locator('i.fa-plus-square').first().click();

    const firstProductDetailsDescription: string = (await page.locator('div.product-information h2').textContent())!.trim();
    const firstProductDetailsPrice: string = (await page.locator('div.product-information span span').textContent())!.trim();

    await page.locator('a', { has: page.locator('i.card_travel') }).click();

    await page.locator('div.product-image-wrapper').locator('i.fa-plus-square').nth(1).click();
    const secondProductDetailsDescription: string = (await page.locator('div.product-information h2').textContent())!.trim();
    const secondProductDetailsPrice: string = (await page.locator('div.product-information span span').textContent())!.trim();

    //Add products to cart
    await page.locator('a', { has: page.locator('i.card_travel') }).click();
    const firstItem: Locator = page.locator('div.product-image-wrapper').filter({ has: page.locator('a[data-product-id="1"]') });
    await firstItem.hover();
    firstItem.locator('div.overlay-content').locator('a[data-product-id="1"]').click();

    //Click 'Continue Shopping' button
    await expect(page.locator('#cartModal')).toBeVisible();
    await page.locator('button.btn-block').click();

    //Hover over second product and click 'Add to cart'
    const secondItem: Locator = page.locator('div.product-image-wrapper').filter({ has: page.locator('a[data-product-id="2"]') });
    await secondItem.hover();
    await secondItem.locator('div.overlay-content').locator('a[data-product-id="2"]').click();

    //Click 'View Cart' button
    await page.locator('div.modal-body a', { hasText: 'View Cart' }).click();

    //Verify that cart page is displayed
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');

    const firstProductDetailsCartQuantity: string = (await page.locator('#product-1 td.cart_quantity').textContent())!.trim();
    const firstProductDetailsCartTotalPrice: string = (await page.locator('#product-1 p.cart_total_price').textContent())!.trim();
    const secondProductDetailsCartQuantity: string = (await page.locator('#product-2 td.cart_quantity').textContent())!.trim();
    const secondProductDetailsCartTotalPrice: string = (await page.locator('#product-2 p.cart_total_price').textContent())!.trim();

    //Click Proceed To Checkout
    await page.locator('a.btn-default.check_out').click();

    //Click 'Register / Login' button
    await expect(page.locator('#checkoutModal')).toBeVisible();
    await page.locator('div.modal-body a[href="/login"]').click();

    //Verify 'New User Signup!' is visible
    await expect(page.locator('div.signup-form h2')).toHaveText("New User Signup!");

    //Enter name and email address
    await page.locator('input[data-qa="signup-name"]').fill(config.userName);
    await page.locator('input[data-qa="signup-email"]').fill(config.email14);

    //Click 'Signup' button
    await page.locator('button[data-qa="signup-button"]').click();

    //Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.locator('div.login-form h2').first()).toHaveText('Enter Account Information');

    //Fill details: Title, Name, Email, Password, Date of birth
    await expect(page.locator('#name')).toHaveValue(config.userName);
    await expect(page.locator('#email')).toHaveValue(config.email14);

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
    expect(valueUserName).toBe(`Logged in as ${config.userName}`);

    //Click 'Cart' button
    await page.locator('ul.navbar-nav a', { has: page.locator('i.fa-shopping-cart') }).click();

    //Click Proceed To Checkout
    await page.locator('a.btn-default.check_out').click();

    //Verify Address Details and Review Your Order
    await expect(page.locator('div.step-one h2.heading').first()).toHaveText("Address Details");

    const firstNameValueAddressDetails: string = (await page.locator('#address_delivery li.address_firstname').textContent())!.trim();
    expect(firstNameValueAddressDetails).toBe(`Mrs. ${firstName} ${lastName}`);

    //company
    const companyValueAddressDetails: string = (await page.locator('#address_delivery li.address_address1.address_address2').first().textContent())!.trim();
    expect(companyValueAddressDetails).toBe(company);

    //address1
    const addressValueAddressDetails: string = (await page.locator('#address_delivery li.address_address1.address_address2').nth(1).textContent())!.trim();
    expect(addressValueAddressDetails).toBe(address1);
    //address2
    const addressValue2AddressDetails: string = (await page.locator('#address_delivery li.address_address1.address_address2').last().textContent())!.trim();
    expect(addressValue2AddressDetails).toBe(address2);

    //city, state, zipCode
    const cityStateZipCodeValueAddressDetails: string = (await page.locator('#address_delivery li.address_postcode').textContent())!.trim();
    const cleanCityStateZipCodeAddressDetails: string = cityStateZipCodeValueAddressDetails.replace(/\s+/g, ' ').trim();
    expect(cleanCityStateZipCodeAddressDetails).toBe(`${city} ${state} ${zipCode}`);

    //country
    const countryValueAddressDetails: string = (await page.locator('#address_delivery li.address_country_name').textContent())!.trim();
    expect(countryValueAddressDetails).toBe(country);

    //mobile
    const mobileValueAddressDetails: string = (await page.locator('#address_delivery li.address_phone').textContent())!.trim();
    expect(mobileValueAddressDetails).toBe(mobile);


    //Verify that the billing address is same address filled at the time registration of account

    const firstNameValueBillingDetails: string = (await page.locator('#address_invoice li.address_firstname').textContent())!.trim();
    expect(firstNameValueBillingDetails).toBe(`Mrs. ${firstName} ${lastName}`);

    const cityStateZipCodeValueBillingAddress: string = (await page.locator('#address_invoice li.address_postcode').textContent())!.trim();
    const cleanCityStateZipCodeBillingAddress: string = cityStateZipCodeValueBillingAddress.replace(/\s+/g, ' ').trim();
    expect(cleanCityStateZipCodeBillingAddress).toBe(`${city} ${state} ${zipCode}`);

    const countryValueBillingAddress: string = (await page.locator('#address_invoice li.address_country_name').textContent())!.trim();
    expect(countryValueBillingAddress).toBe(country);

    const mobileValueBillingAddress: string = (await page.locator('#address_invoice li.address_phone').textContent())!.trim();
    expect(mobileValueBillingAddress).toBe(mobile);

    //Review Your Order verification
    await expect(page.locator('div.step-one h2.heading').last()).toHaveText("Review Your Order");

    const cartTableRows: number = await page.locator('tbody tr[id^="product-"]').count();
    expect(cartTableRows).toEqual(2);

    //дефиниране на променливи за детайлите на продуктите в Product page; проверка на данните в review your order спрямо product page

    const firstProductCartTable: Locator = page.locator('tbody tr[id="product-1"]');
    const fisrtItemCartDescription: string = (await firstProductCartTable.locator('td.cart_description h4').textContent())!.trim();
    const firstItemCartPrice: string = (await firstProductCartTable.locator('td.cart_price').textContent())!.trim();
    const fisrtItemCartQuantity: string = (await firstProductCartTable.locator('td.cart_quantity').textContent())!.trim();
    const firstItemCartTotal: string = (await firstProductCartTable.locator('td.cart_total').textContent())!.trim();

    expect(fisrtItemCartDescription).toBe(firstProductDetailsDescription);
    expect(firstItemCartPrice).toBe(firstProductDetailsPrice);
    expect(fisrtItemCartQuantity).toBe(firstProductDetailsCartQuantity);
    expect(firstItemCartTotal).toBe(firstProductDetailsCartTotalPrice);

    const secondProductCartTable: Locator = page.locator('tbody tr[id="product-2"]');

    const secondItemCartDescription: string = (await secondProductCartTable.locator('td.cart_description h4').textContent())!.trim();
    const secondItemCartPrice: string = (await secondProductCartTable.locator('td.cart_price').textContent())!.trim();

    const secondItemCartQuantity: string = (await secondProductCartTable.locator('td.cart_quantity').textContent())!.trim();

    const secondItemCartTotal: string = (await secondProductCartTable.locator('td.cart_total').textContent())!.trim();

    expect(secondItemCartDescription).toBe(secondProductDetailsDescription);
    expect(secondItemCartPrice).toBe(secondProductDetailsPrice);
    expect(secondItemCartQuantity).toBe(secondProductDetailsCartQuantity);
    expect(secondItemCartTotal).toBe(secondProductDetailsCartTotalPrice);

    // Enter description in comment text area and click 'Place Order'
    await page.locator('textarea.form-control').fill('order this clothes');
    await page.locator('a.check_out').click();

    //Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await expect(page.locator('div.step-one').filter({ hasText: "Payment" })).toBeVisible();
    await page.locator('input[data-qa="name-on-card"]').fill('test test');
    await page.locator('input[data-qa="card-number"]').fill('testtest');
    await page.locator('input[data-qa="cvc"]').fill('tst');
    await page.locator('input[data-qa="expiry-month"]').fill('mm');
    await page.locator('input[data-qa="expiry-year"]').fill('yyyy');

    //Click 'Pay and Confirm Order' button
    //Verify success message 'Your order has been placed successfully!'

    const [messageText] = await Promise.all([
        page.locator('#success_message').textContent(), // хващаме текста веднага
        page.click('button[data-qa="pay-button"]'), // кликът, който задейства и съобщението, и навигацията
        page.waitForLoadState() // изчакваме навигацията след това
    ]);

    expect(messageText?.trim()).toBe('Your order has been placed successfully!');

    //Click 'Delete Account' button
    await page.locator('a', { has: page.locator('i.fa-trash-o') }).click();

    //Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.locator('h2[data-qa="account-deleted"]')).toHaveText('Account Deleted!');
    await page.locator('a[data-qa="continue-button"]').click();

});