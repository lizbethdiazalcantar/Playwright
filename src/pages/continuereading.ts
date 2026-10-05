import { Page } from '@playwright/test';

export class CourseHome {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}


  // Action Methods
  async navigateToLogin() {
    await this.page.goto('/user/login');
  } 