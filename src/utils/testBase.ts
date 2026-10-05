import { Page } from '@playwright/test';

export class TestBase {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `src/screenshots/${name}.png` });
  }
}
