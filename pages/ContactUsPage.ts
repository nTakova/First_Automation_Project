import { Locator, Page } from "@playwright/test";

export class ContactUsPage {
    readonly page: Page;
    readonly contactUsHeading: Locator;
    readonly getInTouchHeading: Locator;


    readonly inputName: Locator;
    readonly inputEmail: Locator;
    readonly inputSubject: Locator;
    readonly inputMessage: Locator;
    readonly uploadFile: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactUsHeading = page.locator('h2.title.text-center').filter({ hasText: 'Contact Us' });
        this.getInTouchHeading = page.locator('h2').filter({ hasText: 'Get In Touch' });
        this.inputName = page.locator('input[data-qa="name"]');
        this.inputEmail = page.locator('input[data-qa="email"]');
        this.inputSubject = page.locator('input[data-qa="subject"]');
        this.inputMessage = page.locator('textarea[data-qa="message"]');
        this.uploadFile = page.locator('input[type="file"]');
        this.submitButton = page.locator('input[data-qa="submit-button"]');
    }

    async navigate() {
        await this.page.goto('https://automationexercise.com/contact_us');

    }
    async fillContactForm(name: string, email: string, subject: string, message: string, filePath: string) {
        await this.inputName.fill(name);
        await this.inputEmail.fill(email);
        await this.inputSubject.fill(subject);
        await this.inputMessage.fill(message);
        await this.uploadFile.setInputFiles(filePath);
    }
    async submitForm() {
        await this.submitButton.click();
    }
}