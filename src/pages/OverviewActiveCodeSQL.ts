import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../pages/textbookPage';

export class OverviewActiveCodeSQL extends TextbookPage{
  page: Page;

  

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
// .............Selectors.................//

saveAndRun = '//button[normalize-space(text())="Save & Run"]'
outPutArea = '#sql1_stdout'
loadingDBText = 'Loading DB...'
sqlResultOut = '#sql1_sql_out'
codeMirrorFirstLine = '.CodeMirror-line'
showSource = "//button[@class='btn reveal_button btn-default']"
hideSource = "//button[@class='btn btn-default reveal_button']"
sourceBox = "//div[@class='highlight']"




}