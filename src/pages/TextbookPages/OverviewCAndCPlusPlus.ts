import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class OverviewCAndCPlusPlus extends TextbookPage{
  page: Page;

  editorContainer1 = 'div#hw_in_c div[lang="c"] div.ac_code_div .CodeMirror.cm-s-default.ui-resizable';
  editorContainer1Focused = `${this.editorContainer1}.CodeMirror-focused`;
  saveAndRunButton = '//button[normalize-space(text())="Save & Run"]';
  showCodeLensButton = '//button[normalize-space(text())="Show CodeLens"]';
  //codeLensVisualizer = 'div#lc2_codelens .ExecutionVisualizer';
  codeLensVisualizer = '#hw_in_c_codelens';
  question1Output = '#hw_in_c_stdout';


  constructor(page: Page) {
    super(page);
    this.page = page;
  }


}


