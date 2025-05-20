import { test, expect } from '@playwright/test';
import path from 'path';
import { chromium } from '@playwright/test';

test ('Contact form', async ({page}) => {
  await page.goto('https://automationexercise.com/');

//Accept coockies
  await page.getByRole('button', { name: 'Consent' }).click();
    
//Home page is visible
    //await expect(page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).nth(3)).toBeVisible();
    //await expect(page.locator('.container')).toBeVisible;
    //await expect(page.locator('ul.nav.navbar-nav')).toBeVisible();
  await expect(page.locator('.navbar-nav')).toBeVisible();
    
//Click on 'Contact Us' button
    //await page.getByRole('link', { name: ' Contact us' }).click();
    //await page.locator('ul.navbar-nav a[href="/contact_us"]').click();
  await page.locator('.fa-envelope').click();

//Verify 'GET IN TOUCH' is visible
    //await expect(page.getByText("Get In Touch")).toBeVisible();
  await expect(page.locator('h2.title',  {hasText: " Get In Touch "})).toBeVisible();

//Enter name, email, subject and message
    /*
    await page.getByRole('textbox', {name:"Name"}).fill("test");
    await page.getByRole('textbox', {name:"Email", exact:true}).fill("avi.test@mail.bg");
    await page.getByRole('textbox', {name:"Subject"}).fill("test");
    await page.getByRole('textbox', {name:"Your Message Here"}).fill("test");
    */
  await page.locator('[data-qa="name"]').fill("test");
  await page.locator('[data-qa="email"]').fill("avi.test@mail.bg");
  await page.locator('[data-qa="subject"]').fill("test");
  await page.locator('[data-qa="message"]').fill("test");
    
// Upload file
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[name="upload_file"]').click();
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
    //await expect(page.locator('#contact-form').getByText('Success! Your details have')).toBeVisible(); - защо този код не намира текста
  await expect(page.locator('div.status.alert-success')).toBeVisible();

//Click 'Home' button and verify that landed to home page successfully
    //await page.locator('a.btn.btn-success').click();
  await page.locator('.contact-form .btn').click();
  await expect(page).toHaveURL('https://automationexercise.com/');

});