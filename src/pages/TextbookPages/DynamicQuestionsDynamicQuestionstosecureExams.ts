import { Page, expect, Locator } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class DynamicQuestionsDynamicQuestionstosecureExams extends TextbookPage {
  page: Page;

  question4_3_1;
  question_1: any;
  startButton: any;
  flagButton: any;
  FinishExamButton: Locator;
  ShowSourceButton: Locator;
  HideSourceButton: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.startButton = page.locator('button:has-text("Start")');
    this.question4_3_1 = page.locator('div:has-text("Question 4.3.1")');
    this.question_1 = page.locator('question_0');
    this.flagButton = page.locator('button:has-text("Flag Question")');
    this.FinishExamButton = page.locator('button:has-text("Finish")');
    this.ShowSourceButton = page.locator('button:has-text("Open Source")');
    this.HideSourceButton = page.locator('button:has-text("Hide Source")'); 
  }
  }
