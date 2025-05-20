
import { test, expect } from '@playwright/test';
import { config } from './config';

test ('Add to Shopping cart', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

//Verify that home page is visible successfully
    await expect(page.locator('.navbar-nav')).toBeVisible();

//Click on 'Products' button
    //await page.locator('ul.navbar-nav a[href="/products"]').click();
    await page.locator('.card_travel').click();

//Verify user is navigated to ALL PRODUCTS page successfully
    await expect (page).toHaveURL('https://automationexercise.com/products');

//Enter product name in search input and click search button
    const searchTerm = 'Shirt';    
    await page.locator('#search_product').fill(searchTerm);
    await page.locator('#submit_search').click();

//Verify 'SEARCHED PRODUCTS' is visible
  await expect(page.locator('.title.text-center')).toBeVisible();
    
//Verify all the products related to search are visible
// търся всички елементи, които съдържат класа product info, съответния текст

const products = await (page.locator('.productinfo').filter({hasText:searchTerm})).allTextContents();
const productsCount = await page.locator('.productinfo').count();
console.log(productsCount);

const cleanedProducts = products.map(product => {
    const lines = product.trim().split('\n').map(line =>line.trim());
    return lines.find(line => !line.includes('Rs.') && !line.includes("Add to cart"));
});

for (const product of cleanedProducts) {
    //expect(product).toContain(searchTerm); - търси search term, а има продукти с по-дълго описание
    expect(product).toMatch(new RegExp(searchTerm, "i"));
 }

    console.log(cleanedProducts);

//Add those products to cart
 const foundProducts = await page.$$('.productinfo');
/*
for (const product of products) {
  const addToCartButton = await foundProducts.('.add-to-cart-button');
  if (addToCartButton) {
    await addToCartButton.click();
    await page.waitForTimeout(500);
  }
}
*/



//Click 'Cart' button and verify that products are visible in cart
   await page.locator('[href="/view_cart"]').filter({has:page.locator('i.fa-shopping-cart')}).click();
    

//Click 'Signup / Login' button and submit login details
    await page.locator('i.fa-lock').click();

//Verify 'New User Signup!' is visible
    expect (await page.locator('div.signup-form')).toBeVisible();

//Enter name and email address

    await page.locator('[data-qa="signup-name"]').fill(config.userName);
    await page.locator('[data-qa="signup-email"]').fill(config.email20);
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
       await expect(icon).toBe(` Logged in as ${config.userName}`);


//Again, go to Cart page
    await page.locator('[href="/view_cart"]').filter({has:page.locator('i.fa-shopping-cart')}).click();

});

//Verify that those products are visible in cart after login as well

