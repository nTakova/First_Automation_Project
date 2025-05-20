import { test, expect } from '@playwright/test';

test ('Add to card from Recommended items', async ({page}) => {
    await page.goto('https://automationexercise.com/');
    
//Accept coockies
    await page.getByRole('button', { name: 'Consent' }).click();

//Verify that home page is visible successfully
    await expect(page.locator('.navbar-nav')).toBeVisible();

//Scroll down page to bottom
    await page.locator('.single-widget').scrollIntoViewIfNeeded();

// Verify 'SUBSCRIPTION' is visible
    await expect (page.locator('.single-widget')).toBeVisible();

//Click on arrow at bottom right side to move upward
    await page.locator("#scrollUp").click();

//Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    //await expect(page.locator('.carousel-inner')).toBeVisible({ timeout: 5000 });
    //filter({hasText:"Full-Fledged practice website for Automation Engineers"}))
    await expect(page.locator('.carousel-inner').filter({hasText:"Full-Fledged practice website for Automation Engineers"})).toBeVisible({ timeout: 5000 });

});
