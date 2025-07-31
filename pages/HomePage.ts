//тук ще бъдат всички бутони на хоум страницата
//карусела
//категории
//марки
//рекъмендед продуктс
//събскрипшън

import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly homeButton: Locator;
    readonly productsButton: Locator;
    readonly cartButton: Locator;
    readonly logoutButton: Locator;
    readonly delAccountButton: Locator;
    readonly testCasesButton: Locator;
    readonly contactUsButton: Locator;
    readonly loggedInAsButton: Locator;

    readonly carousel: Locator;

    readonly category: Locator;
    readonly brands: Locator;

    readonly recommendedItems: Locator;

    readonly subscriptionHome: Locator;
    readonly subscriptionInputField: Locator;



    constructor(page: Page) {
        this.page = page;
        this.homeButton = page.locator('a', { has: page.locator('i.fa-home') });
        this.productsButton = page.locator('a', { has: page.locator('i.card_travel') });
        this.cartButton = page.locator('a[href="/view_cart"]',
            { has: page.locator('i.fa-shopping-cart') })
            .filter({ hasText: 'Cart' });
        this.logoutButton = page.locator('a', { has: page.locator('i.fa-lock') });
        this.delAccountButton = page.locator('a', { has: page.locator('i.fa-trash-o') });
        this.testCasesButton = page.locator('a', { has: page.locator('i.fa-list') })
            .filter({ hasText: 'Test Cases' });
        this.contactUsButton = page.locator('a', { has: page.locator('i.fa-envelope') });
        this.loggedInAsButton = page.locator("a", { has: page.locator("i.fa-user") });

        this.carousel = page.locator('.carousel-inner')
            .filter({ hasText: "Full-Fledged practice website for Automation Engineers" });

        this.category = page.locator('.left-sidebar').filter({ hasText: 'Category' });
        this.brands = page.locator('.brands_products h2').filter({ hasText: 'Brands' });

        this.recommendedItems = page.locator('h2.title.text-center').last();

        this.subscriptionHome = page.locator('div.single-widget h2');
        this.subscriptionInputField = page.locator('#susbscribe_email');

    }


    async navigateHome() {
        await this.page.goto('https://automationexercise.com');

    }

    async clickProductsButton() {
        await this.productsButton.click();
    }

    async clickCartButton() {
        await this.cartButton.click();
    }
    async clickLogoutButton() {
        await this.logoutButton.click();
    }

    async clickDelAccountButton() {
        await this.delAccountButton.click();
    }

    async clickTestCaseButton() {
        await this.testCasesButton.click();
    }

    async clickContactUsButton() {
        await this.contactUsButton.click();
    }

    async loggedInAs(userName: string) {
        await expect(this.loggedInAsButton).toBe(`Logged in as ${userName}`);
    }

    async carouselVisible() {
        await expect(this.carousel).toBeVisible();
    }
    async categoryVisible() {
        await expect(this.category).toBeVisible();
    }

    async brandsVisible() {
        await expect(this.brands).toBeVisible();
    }

    async recomendedItemsVisible() {
        await expect(this.recommendedItems).toBeVisible();

    }
    async subscriptionHomeOption(subscriptionEmail: string) {
        await expect(this.subscriptionHome).toBeVisible();
        await this.subscriptionInputField.fill(subscriptionEmail);
    }


}