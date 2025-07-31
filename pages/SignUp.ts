import { Locator, Page } from "@playwright/test";

export class SignUpPage {
    readonly page: Page;
    readonly gender: Locator;
    readonly name: Locator;
    readonly email: Locator;

    readonly password: Locator;
    readonly date: Locator;
    readonly month: Locator;
    readonly year: Locator;

    readonly newsletter: Locator;
    readonly optin: Locator;

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly address1: Locator;
    readonly address2: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipCode: Locator;
    readonly mobile: Locator;

    readonly createAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.gender = page.locator('#uniform-id_gender2');

        this.password = page.locator('#password');

        this.date = page.locator('#days');
        this.month = page.locator('#months');
        this.year = page.locator('#years');

        this.newsletter = page.locator('#newsletter');
        this.optin = page.locator('#optin');

        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.company = page.locator('#company');
        this.address1 = page.locator('#address1');
        this.address2 = page.locator('#address2');
        this.country = page.locator('#country');
        this.state = page.locator('#state');
        this.city = page.locator('#city');
        this.zipCode = page.locator('#zipcode');
        this.mobile = page.locator('#mobile_number');

        this.createAccountButton = page.locator('button[data-qa="create-account"]');


    }
    async navigate() {
        await this.page.goto('https://automationexercise.com/signup');

    }

    async signUp(
        gender: 'Mr' | 'Mrs',
        password: string,
        date: string,
        month: string,
        year: string,

        newsletter: boolean,
        optin: boolean,

        firstName: string,
        lastName: string,
        company: string,
        address1: string,
        address2: string,
        country: string,
        state: string,
        city: string,
        zipCode: string,
        mobile: string
    ) {

        await this.gender.click();
        await this.password.fill(password);
        await this.date.selectOption(date);
        await this.month.selectOption(month);
        await this.year.selectOption(year);
        await this.newsletter.check();
        await this.optin.check();

        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.company.fill(company);
        await this.address1.fill(address1);
        await this.address2.fill(address2);
        await this.country.selectOption(country);
        await this.state.fill(state);
        await this.city.fill(city);
        await this.zipCode.fill(zipCode);
        await this.mobile.fill(mobile);

        await this.createAccountButton.click();

    }

}
