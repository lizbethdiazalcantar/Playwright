import { Page, Locator, expect } from '@playwright/test';

export class NavigationPage {
    readonly page: Page;
    readonly nextButton: Locator;
    readonly prevButton: Locator;
    readonly courseTextbookLink: Locator;
    readonly chapterLink: Locator;
    readonly sectionLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nextButton = page.getByRole('main').getByRole('link', { name: 'Next' });
        this.prevButton = page.getByRole('main').getByRole('link', { name: 'Prev' });
        this.courseTextbookLink = page.getByRole('link').first();
        this.chapterLink = page.getByRole('link', { name: 'Understanding the Derivative' });
        this.sectionLink = page.locator('#ptx-content').getByRole('link', { name: 'How do we measure velocity?' });
    }
/*
    // Select Active Calculus Course and validate next button
        await page.getByText('Runestone Interactive Overview').click();
        page.waitForLoadState('domcontentloaded');
        await page.getByText('1.1. ActiveCode Examples in Python').click();

        await page.getByText('1.1. ActiveCode Examples in Python').click();
        page.waitForLoadState('domcontentloaded');
        expect(page).toHaveURL('/ns/books/published/overview/ActiveCode/python.html');
        await page.locator('ul.nextprev-list > li:nth-child(2)').click();

        expect(page).toHaveURL('/ns/books/published/overview/ActiveCode/python.html');
        await page.locator('ul.nextprev-list > li:nth-child(2)').click();
        page.waitForLoadState('domcontentloaded');
        expect(page.getByText('1.9. Audio Tours')).toBeVisible();
        expect(page).toHaveURL('/ns/books/published/overview/ActiveCode/audiotours.html');

         // validate previous button
        await page.locator('ul.nextprev-list > li:nth-child(1)').click();
        page.waitForLoadState('domcontentloaded');
        expect(page.getByText('1.1. ActiveCode Examples in Python')).toBeVisible();
    }*/

       async selectChapter() {
        await this.chapterLink.waitFor();
        await this.chapterLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async selectSection() {
        await this.sectionLink.waitFor();
        await this.sectionLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickNext() {
        await this.nextButton.waitFor();
        await this.nextButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickPrev() {
        await this.prevButton.waitFor();
        await this.prevButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getCurrentPageUrl(): Promise<string> {
        return this.page.url();
    }

    async verifyNavigationButtons() {
        await expect(this.nextButton).toBeVisible();
        await expect(this.prevButton).toBeVisible();
    }
}
