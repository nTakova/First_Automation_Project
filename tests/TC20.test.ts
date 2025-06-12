
import { test, expect, Locator } from '@playwright/test';
import { config } from './config';

test('Add to Shopping cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  //Accept cookies
  await page.getByRole('button', { name: 'Consent' }).click();

  //Verify that home page is visible successfully
  await expect(page.locator('#slider')).toBeVisible();

  //Click on 'Products' button
  await page.locator('.card_travel').click();

  //Verify user is navigated to ALL PRODUCTS page successfully
  await expect(page).toHaveURL('https://automationexercise.com/products');

  //Enter product name in search input and click search button
  const searchTerm: string = 'Shirt';
  await page.locator('#search_product').fill(searchTerm);
  await page.locator('#submit_search').click();

  //Verify 'SEARCHED PRODUCTS' is visible
  const searchText: Locator = page.locator('.title.text-center');
  await expect(searchText).toHaveText('Searched Products');

  //Verify all the products related to search are visible
  const products: Locator = page.locator('.productinfo.text-center');

  const productCount: number = await products.count();
  for (let i = 0; i < productCount; i++) {
    const product: Locator = products.nth(i);
    const name: string = await product.locator('p').innerText();
    expect(name.toLowerCase()).toContain('e');
  }
  // Add those products to cart


  for (let i = 0; i < productCount; i++) {
    const product: Locator = products.nth(i);

    // Hover, за да се покаже бутонът (ако е необходимо)
    await product.hover();

    // "Add to cart"
    const addToCartButton: Locator = product.locator('a').filter({ hasText: 'Add to cart' });
    await addToCartButton.click();

    // Click Continue shopping
    await expect(page.locator('#cartModal')).toBeVisible();
    await page.locator('.btn-block').click();
  }
  // Click 'Cart' button and verify that products are visible in cart
  await page.locator('[href="/view_cart"]').filter({ has: page.locator('i.fa-shopping-cart') }).click();
  await expect(page).toHaveURL('https://automationexercise.com/view_cart');


  // Verify that the produts are in the Cart
  const cartItems: Locator = page.locator('.cart_description'); // или друг точен селектор
  await expect(cartItems.first()).toBeVisible();

  const cartItemCount: number = await cartItems.count();
  expect(cartItemCount).toBeGreaterThan(0);

  console.log(` ${cartItemCount} products in the cart`);

  // Click 'Signup / Login' button and submit login details

  await page.locator('a i.fa-lock').click();

  const userName: string = "TEST";
  const email: string = "test33@qa3.3";

  //Fill all details in Signup and create account
  await expect(page.locator('div.signup-form')).toContainText('New User Signup!');

  //Enter name and email address
  await page.locator('input[data-qa="signup-name"]').fill(userName);
  await page.locator('input[data-qa="signup-email"]').fill(email);

  //Click 'Signup' button
  await page.locator('button[data-qa="signup-button"]').click();

  //Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await expect(page.locator('div.login-form')).toContainText('Enter Account Information');

  //Fill details: Title, Name, Email, Password, Date of birth
  //да се направи проверка дали name & email са попълнени със същите данни
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
  await expect(page.locator('h2[data-qa="account-created"]')).toContainText('Account Created!');

  //Click 'Continue' button
  await page.locator('.btn[data-qa="continue-button"]').click();

  //Verify that 'Logged in as username' is visible
  const valueUserName: string | null = await (page.locator('a:has(i.fa-user)').textContent());
  const trimmedValue: string = (valueUserName as string).trim();
  await expect(trimmedValue).toBe(`Logged in as ${userName}`);


  //  Again, go to Cart page
  await page.locator('[href="/view_cart"]').filter({ has: page.locator('i.fa-shopping-cart') }).click();

  // Verify that those products are visible in cart after login as well
  await expect(cartItems.first()).toBeVisible();
  expect(cartItemCount).toBeGreaterThan(0);
  console.log(` ${cartItemCount} products in the cart`);

});
