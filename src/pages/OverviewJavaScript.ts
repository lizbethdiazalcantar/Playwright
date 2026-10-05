import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../pages/textbookPage';

export class OverviewJavaScript extends TextbookPage{
  page: Page;

  

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  // .............Selectors.................//

  saveAndRun = '//button[@class="btn btn-success run-button"]'
  outPutArea = '//*[@id="jstest1_stdout"]'
  codeMirrorFirstLine = '.CodeMirror-line'
  errorAlert = '//div[contains(@class, "alert-danger")]'
  reformatButton = "//button[@class='ac_opt btn btn-default']"
  showSource = "//button[@class='btn reveal_button btn-default']"
  hideSource = "//button[@class='btn btn-default reveal_button']"
  sourceBox = "//div[@class='highlight']"


}