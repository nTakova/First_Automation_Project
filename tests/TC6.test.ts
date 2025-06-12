import { test, expect } from '@playwright/test';
import path from 'path';
import { chromium } from '@playwright/test';

test('Contact form', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  //Accept cookies
  await page.getByRole('button', { name: 'Consent' }).click();

  //Home page is visible
  await expect(page.locator('#slider')).toBeVisible();

  //Click on 'Contact Us' button
  await page.locator('.fa-envelope').click();

  //Verify 'GET IN TOUCH' is visible
  await expect(
    page.locator("h2.title", { hasText: " Get In Touch" }))
    .toBeVisible();

  //Enter name, email, subject and message
  await page.locator('input[data-qa="name"]').fill("test");
  await page.locator('input[data-qa="email"]').fill("avi.test@mail.bg");
  await page.locator('input[data-qa="subject"]').fill("test");
  await page.locator('textarea[data-qa="message"]').fill("test");

  // Upload file
  //const fileChooserPromise = page.waitForEvent('filechooser');
  await page
    .locator('input[name="upload_file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, './myfile.pdf'));

  //Click 'Submit' button
  //await page.getByRole('button', { name: ' Submit' }).click();
  await page.locator('[data-qa="submit-button"]').click();

  //alert dialog conformation
  page.once('dialog', async dialog => {
    console.log(`Dialog message: ${(dialog.message())} `);
    await dialog.accept();
  });
  await page.click('[name="submit"]');

  //Verify success message 'Success! Your details have been submitted successfully.' is visible
  await expect(page.locator('div.status.alert-success')).toContainText('Success! Your details have been submitted successfully.');

  //Click 'Home' button and verify that landed to home page successfully
  await page.locator('.contact-form .btn').click();
  await expect(page).toHaveURL('https://automationexercise.com/');

});