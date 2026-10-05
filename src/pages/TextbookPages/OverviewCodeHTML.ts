import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class OverviewCodeHTML extends TextbookPage{
  page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

//.........Selectors...........//

saveAndRun = '//button[@class="btn btn-success run-button"]'
outPutIframe = 'div.ac_output iframe'
iframeBody = 'body'
iframeHeading = 'h2'
listItem = 'ul > li'
codeMirrorFirstLine = '.CodeMirror-line'
errorAlert = '.alert.alert-danger'
showSource = "//button[@class='btn reveal_button btn-default']"
hideSource = "//button[@class='btn btn-default reveal_button']"
sourceBox = "//div[@class='highlight']"




}

