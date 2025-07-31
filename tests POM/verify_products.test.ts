import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

test('Verify products', async ({ page }) => {


    const homePage = new HomePage(page);
    const productsVerification = new ProductsPage(page);

    await homePage.navigateHome();
    await page.getByRole('button', { name: 'Consent' }).click();

    await homePage.clickProductsButton();
    await expect(page).toHaveURL('https://automationexercise.com/products');


    await productsVerification.verifyAllProductsVisible();

    /*
    await productsVerification.firstItemAddToCart();
    await productsVerification.secondItemAddToCart();

    await productsVerification.viewCart();
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');
*/
    await productsVerification.viewFirstProduct();
    await productsVerification.productDetailsVisible();


})

/*
Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Products' button
5. Verify user is navigated to ALL PRODUCTS page successfully
6. The products list is visible

7. Click on 'View Product' of first product
8. User is landed to product detail page
9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
*/