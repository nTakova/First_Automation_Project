import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly loginEmail: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    readonly signUpName: Locator;
    readonly signUpEmail: Locator;
    readonly sigunUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginEmail = page.locator('input[data-qa="login-email"]');
        this.password = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.locator('button[data-qa="login-button"]');

        this.signUpName = page.locator('input[data-qa="signup-name"]');
        this.signUpEmail = page.locator('input[data-qa="signup-email"]');
        this.sigunUpButton = page.locator('button[data-qa="signup-button"]');
    }
    async navigate() {
        await this.page.goto('https://automationexercise.com/login');

    }
    async login(emailLogin: string, password: string) {
        await this.loginEmail.fill(emailLogin);
        await this.password.fill(password);
        await this.loginButton.click();

    }

    async signUp(userName: string, emailSignIn: string) {
        await this.signUpName.fill(userName);
        await this.signUpEmail.fill(emailSignIn);
        await this.sigunUpButton.click();

    }
}