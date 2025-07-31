import { Locator, Page, expect } from "@playwright/test";

export class ProductsPage {
    readonly page: Page;
    readonly allProductsHeading: Locator;
    readonly firstProduct: Locator;
    readonly secondProduct: Locator;

    readonly addToCartFirstProduct: Locator;
    readonly addToCartSecondProduct: Locator;
    readonly ViewFirstProductButton: Locator;
    readonly ViewSecondProductButton: Locator;

    readonly firstItemDescription: Locator;

    readonly modalContinueShoppingButton: Locator;
    readonly modalViewCartButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.allProductsHeading = page.locator('h2.title.text-center').filter({ hasText: 'All Products' });
        this.firstProduct = page.locator('div.product-image-wrapper').filter({ has: page.locator('a[data-product-id="1"]') });
        this.secondProduct = page.locator('div.product-image-wrapper').filter({ has: page.locator('a[data-product-id="2"]') });


        this.addToCartFirstProduct = page.locator('div.overlay-content').locator('a[data-product-id="1"]');
        this.addToCartSecondProduct = page.locator('div.overlay-content').locator('a[data-product-id="2"]');

        this.ViewFirstProductButton = page.locator('div.product-image-wrapper').locator('i.fa-plus-square').first();
        this.ViewSecondProductButton = page.locator('div.product-image-wrapper').filter({ has: page.locator('a[data-product-id="2"]') }).locator('i.fa-plus-square');

        this.firstItemDescription = page.locator('div.product-information').filter({ has: page.locator('h2') }).first();

        this.modalContinueShoppingButton = page.locator('button.btn-block');
        this.modalViewCartButton = page.locator('div.modal-body a', { hasText: 'View Cart' });
    }

    async navigate() {
        await this.page.goto('https://automationexercise.com/');

    }
    async productsButton() {
        await this.page.locator('ul.navbar-nav a', { has: this.page.locator('i.card_travel') }).click;
    }
    async firstItemAddToCart() {
        await this.firstProduct.hover();
        await this.addToCartFirstProduct.click();
        await expect(this.page.locator('#cartModal')).toBeVisible();
        await this.modalContinueShoppingButton.click();

    }
    async secondItemAddToCart() {
        await this.secondProduct.hover();
        await this.addToCartSecondProduct.click();
        await expect(this.page.locator('#cartModal')).toBeVisible();
        await this.modalContinueShoppingButton.click();
    }


    // view cart
    async viewCart() {
        await this.page.locator('ul.navbar-nav a', { has: this.page.locator('i.fa-shopping-cart') }).click()
    }
    //continue shopping
    async continueShopping() {
        await this.page.locator('button.btn-block').click();
    }

    // Verify that all products are visible
    async verifyAllProductsVisible() {
        await expect(this.allProductsHeading).toBeVisible();
        await expect(this.firstProduct).toBeVisible();
        await expect(this.secondProduct).toBeVisible();
    }

    // Verify that the first product is visible
    async verifyFirstProductVisible() {
        await expect(this.firstProduct).toBeVisible();
    }

    // View first product
    async viewFirstProduct() {
        await this.ViewFirstProductButton.click();
        await expect(this.page).toHaveURL('https://automationexercise.com/product_details/1');
        await expect(this.firstItemDescription).toBeVisible();
    }

    async productDetailsVisible() {
        await expect(this.firstItemDescription).toBeVisible();
        await expect(this.firstItemDescription.locator('h2')).toHaveText('Blue Top');
        await expect(this.firstItemDescription.locator('p').nth(0)).toHaveText('Category: Women > Tops');
        await expect(this.firstItemDescription.locator('span span')).toHaveText('Rs. 500');
        await expect(this.firstItemDescription.locator('p').nth(1)).toHaveText('Availability: In Stock');
        await expect(this.firstItemDescription.locator('p').nth(2)).toHaveText('Condition: New');
        await expect(this.firstItemDescription.locator('p').nth(3)).toHaveText('Brand: Polo');

    }
}