import { Page } from '@playwright/test';

export class CourseHomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

   // Page element locators/Selectors
  private overview = "a[href='/ns/books/published/DrBrown-Runestone-Overview/index.html']";

   // Action methods
   async clickOverview(){
     await this.page.click(this.overview);
   }
 }
 