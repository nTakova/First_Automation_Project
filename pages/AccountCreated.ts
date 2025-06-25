
import { Locator, Page } from "@playwright/test";

export class AccountCreatedPage {
    readonly page: Page;
    readonly continueButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.locator('[data-qa="continue-button"]');
    }

    async navigate() {
        await this.page.goto('https://automationexercise.com/account_created');

    }

    async clickContinue() {
        await this.continueButton.click();
    }

}