import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../pages/textbookPage';

export class OverviewAudioTours extends TextbookPage{
  page: Page;

  

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
// .............Selectors.................//
  saveAndRunButton = '//button[@class="btn btn-success run-button"]'
  outputArea = "ch03_4_stdout"
  showCodeLens = '//button[@class="ac_opt btn btn-default"]'
  hideCodeLens = '//button[@class="ac_opt btn btn-default"]'
  codelensFrame = '//iframe[@id="ch03_4_codelens"]'
  outPutArea = "#ch03_4_stdout"
  showSource = "//button[@class='btn reveal_button btn-default']"
  hideSource = "//button[@class='btn btn-default reveal_button']"
  sourceBox = "#ch03_4_src pre"
  codeMirrorFirstLine = '.CodeMirror-line'
  errorAlert = '//div[contains(@class, "alert-danger")]'

  async verifyInvitationMessages() {
    const names = ["Joe", "Amy", "Brad", "Angelina", "Zuki", "Thandi", "Paris"];
    for (const name of names) {
      await this.page.locator(`text=Hi ${name} Please come to my party on Saturday!`).waitFor();

     }
    }
  

}