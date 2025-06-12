import { test, expect } from "@playwright/test";
import path from "path";

test("Contact form", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  // Accept cookies
  await page.getByRole("button", { name: "Consent" }).click();

  // Home page is visible
  await expect(page.locator(".navbar-nav")).toBeVisible();

  // Click on 'Contact Us' button
  await page.locator(".fa-envelope").click();

  // Verify 'GET IN TOUCH' is visible
  await expect(
    page.locator("h2.title", { hasText: " Get In Touch" })
  ).toBeVisible();

  // Enter name, email, subject and message
  await page.locator('[data-qa="name"]').fill("test");
  await page.locator('[data-qa="email"]').fill("avi.test@mail.bg");
  await page.locator('[data-qa="subject"]').fill("test");
  await page.locator('[data-qa="message"]').fill("test");

  // Upload file
  await page
    .locator('input[name="upload_file"]')
    .setInputFiles(path.join(__dirname, "./myfile.pdf"));

  // Setup the dialog handler before clicking the submit button
  page.once("dialog", async (dialog) => {
    await dialog.accept();
  });

  // Click the submit button to send the contact form and wait for the page to finish loading after the form is submitted
  await page.locator('[name="submit"]').click();
  await page.waitForLoadState("load");

  // Verify success message is visible
  await expect(page.locator("div.status.alert-success")).toBeVisible();

  // Click 'Home' button and verify landing on home page
  await page.locator(".contact-form .btn").click();
  await expect(page).toHaveURL("https://automationexercise.com/");
});
