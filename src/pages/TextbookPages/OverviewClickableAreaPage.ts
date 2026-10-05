import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class OverviewClickableAreaPage extends TextbookPage{
  page: Page; 
  checkButton = "//button[@class='btn btn-success']";
  errorMessage = "//div[@class='alert alert-danger']";
  correctMessage = "//div[@class='alert alert-info']";
  clickableLine = "//span[@class='clickable']";
  showSourceButton = "#click1_src_show";
  sourceTextArea = ".highlight-rst.notranslate";
  hideSourceButton = "#click1_src_hide";
  showPretextButton = "#ptx_click1_src_show";
  hidePretextButton = "#ptx_click1_src_hide";
  pretextTextArea = ".highlight-xml.notranslate";

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async clickTheLineWith(lineText: string){
    console.log(`Line text is ${lineText}`);

    const locator = `//span[@class='clickable' and text()='${lineText}']`;
    await this.page.locator(this.clickableLine).filter({ hasText: lineText }).click();

  }
}