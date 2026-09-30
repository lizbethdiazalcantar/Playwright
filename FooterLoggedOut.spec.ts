import { test, expect } from '@playwright/test';
import { FooterLoggedOutPage } from '../pages/FooterLoggedOutPage'; // Ensure path is correct

test.describe('Navigation Logged Out Footer', () => {
    let footerPage: FooterLoggedOutPage;

    test.beforeEach(async ({ page }) => {
        console.log(`Running ${test.info().title}`);
        footerPage = new FooterLoggedOutPage(page);
        await footerPage.navigate('/user/login');
        console.log('Navigated to the login page');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
        console.log('Closed the page');
    });

    test('Privacy Policy link should navigate to the correct page', async ({ page }) => {
        console.log('Waiting for Privacy Policy link to become visible');
        await footerPage.privacyPolicyLink.first().waitFor({ state: 'visible' });
        console.log('Clicking Privacy Policy link');
        await footerPage.privacyPolicyLink.first().click();
        console.log('Clicked Privacy Policy link');
        await expect(page).toHaveURL('/runestone/default/privacy');
        console.log('Verified URL after clicking Privacy Policy link');
    });

    test('Terms of Service link should navigate to the correct page', async ({ page }) => {
        console.log('Waiting for Terms of Service link to become visible');
        await footerPage.termsOfServiceLink.waitFor({ state: 'visible' });
        console.log('Clicking Terms of Service link');
        await footerPage.termsOfServiceLink.click();
        console.log('Clicked Terms of Service link');
        await expect(page).toHaveURL('/runestone/default/terms');
        console.log('Verified URL after clicking Terms of Service link');
    });

    test('Back to Top link should keep the user on the same page', async ({ page }) => {
        const currentUrl = page.url();
        console.log('Waiting for Back to Top link to become visible');
        await footerPage.backToTopLink.waitFor({ state: 'visible' });
        console.log('Clicking Back to Top link');
        await footerPage.backToTopLink.click();
        console.log('Clicked Back to Top link');
        await expect(page).toHaveURL(currentUrl + '#');
        console.log('Verified URL remains the same after clicking Back to Top link');
    });
});

