import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class OverviewActiveCodeExampleInPython extends TextbookPage{
  page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }


}