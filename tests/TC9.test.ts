import { test, expect } from '@playwright/test';

test ('Search product', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

//Verify that home page is visible successfully
    await expect(page.locator('.navbar-nav')).toBeVisible();

//Click on 'Products' button
    //await page.locator('ul.navbar-nav a[href="/products"]').click();
    //await page.locator('.material-icons').click();
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

});

/* 
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Products' button
5. Verify user is navigated to ALL PRODUCTS page successfully
6. Enter product name in search input and click search button
7. Verify 'SEARCHED PRODUCTS' is visible
8. Verify all the products related to search are visible
*/