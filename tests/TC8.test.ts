import { test, expect } from '@playwright/test';

test('Verify all products', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    //Accept cookies
    await page.getByRole('button', { name: 'Consent' }).click();

    //Home page is visible
    await expect(page.locator('#slider')).toBeVisible();

    //Click on Products button
    await page.locator('a', { has: page.locator('i.card_travel') }).click();

    //Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page).toHaveURL('https://automationexercise.com/products');

    //The products list is visible
    await expect(page.locator('div.features_items')).toBeVisible();

    //Click on 'View Product' of first product
    await page.locator('div.product-image-wrapper').locator('i.fa-plus-square').first().click();

    //User is landed to product detail page
    expect(page.url()).toContain('https://automationexercise.com/product_details');

    //Verify that detail is visible: product name, category, price, availability, condition, brand
    const productDescription: string = (await page.locator('div.product-information h2').textContent())!.trim();
    const productInformation: string = (await (page.locator('div.product-information p').nth(0)).textContent())!.trim();
    const productPrice: string = (await page.locator('div.product-information span span').textContent())!.trim();
    const productAvailability: string = (await (page.locator('div.product-information p').nth(1)).textContent())!.trim();
    const productCondition: string = (await (page.locator('div.product-information p').nth(2)).textContent())!.trim();
    const productBrand: string = (await (page.locator('div.product-information p').nth(3)).textContent())!.trim();

    //тук съм оставила стринговете, тъй като няма с какво друго да ги сравня освен с product details страницата, от която взимам textContent
    expect(productDescription).toBe("Blue Top");
    expect(productInformation).toBe('Category: Women > Tops');
    expect(productPrice).toBe('Rs. 500');
    expect(productAvailability).toBe('Availability: In Stock');
    expect(productCondition).toBe('Condition: New');
    expect(productBrand).toBe('Brand: Polo');
});