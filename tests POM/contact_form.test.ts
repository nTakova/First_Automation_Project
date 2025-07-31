import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactUsPage } from '../pages/ContactUsPage';



test('Contact us form', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigateHome();
    await page.getByRole('button', { name: 'Consent' }).click();

    await homePage.clickContactUsButton();
    await expect(page.locator('div.contact-form h2.text-center')).toHaveText('Get In Touch');

    // Enter name, email, subject and message
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.fillContactForm('test', 'test@mail.com', 'Test Subject', 'This is a test message', 'myfile.pdf');
    // Upload file
    await contactUsPage.uploadFile.setInputFiles('./myfile.pdf'); // Adjust the file path as necessary



    page.once("dialog", async (dialog) => {
        await dialog.accept();
    });

    // Click the submit button to send the contact form and wait for the page to finish loading after the form is submitted
    await contactUsPage.submitForm();
    await page.waitForLoadState("load");

    // Verify success message is visible
    await expect(page.locator('div.status.alert.alert-success')).toHaveText('Success! Your details have been submitted successfully.');

    // Click 'Home' button and verify landing on home page
    await homePage.homeButton.click();
    await expect(page).toHaveURL("https://automationexercise.com/");

});