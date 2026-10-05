import { Page, Locator } from '@playwright/test';

export class FooterLoggedOutPage {
  private page: Page;
  public privacyPolicyLink: Locator;
  public termsOfServiceLink: Locator;
  public backToTopLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Initialize the selectors using page.locator
    this.privacyPolicyLink = this.page.locator('footer a[href="/runestone/default/privacy"]');
    this.termsOfServiceLink = this.page.locator('footer a[href="/runestone/default/terms"]');
    this.backToTopLink = this.page.locator('footer a[href="#"]:has-text("Back to top")');
  }
  async navigate(url: string) { 
    await this.page.goto(url); 
 }
  
}
