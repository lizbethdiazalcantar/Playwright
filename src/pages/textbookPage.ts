import { Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class TextbookPage extends BasePage {
  page: Page;

  constructor(page: Page) {
    super(page)
    this.page = page;
  }

   // Page element locators/Selectors (Table of Contents section)
  private chapterOneTitle = "a[href='ActiveCode/toctree.html']";
  private thisChapterDropdown = "li[class='dropdown globaltoc-container']";
  private chapter1_1Title = "a[href='python.html']";
  private annotationSidebarButton = "button[aria-label='Annotation sidebar']";


   // Page element locators/Selectors (Navbar section)
  private userMenuIcon = ".glyphicon-user";
  private userMenu = ".user-menu";
  private scratchACIcon = ".glyphicon-pencil";
  private scratchACModal = ".scratch-ac-modal";
  private helpMenuIcon = ".glyphicon-question-sign";
  private helpMenu = "//*[@id='scratch_ac_link']/following-sibling::li[2]";
  

  // Action Methods (TOC section)
  async clickChapterOne() {
    await this.page.click(this.chapterOneTitle);
  }
  async clickThisChapter() {
    await this.page.click(this.thisChapterDropdown);
  }
  async clickChapter1_1() {
    await this.page.click(this.chapter1_1Title);
  }
  async clickAnnotationSidebarButton() {
    await this.page.click(this.annotationSidebarButton);
  }
  

  // Action Methods (navbar section)
  async clickUserMenuIcon() {
    await this.page.click(this.userMenuIcon);
  }
  async clickScratchACIcon() {
    await this.page.click(this.scratchACIcon);
  }
  async clickHelpMenuIcon() {
    await this.page.click(this.helpMenuIcon);
  }
  async getUserText() {
    return await this.page.textContent(this.userMenu);
  }
  async getScratchACText() {
    return await this.page.textContent(this.scratchACModal);
  }
  async getHelpMenuText() {
    return await this.page.textContent(this.helpMenu);
  }

  // CODE MIRROR interactions
  async changeCodeMirrorLine(current: string, changeTo: string){

    await this.page.locator('pre[role="presentation"]', { hasText: current }).click();

     if (process.platform === 'darwin') {
        await this.page.keyboard.press('Home');
        await this.page.keyboard.press('Shift+End');
      } else {
        await this.page.keyboard.press('End');
        await this.page.keyboard.press('Shift+Home');
      }
    await this.page.keyboard.press('Delete')
      

    let currentLength = current.length;
    console.log(`Current string is ${currentLength.toString()} characters long`);
    let changeToLength = changeTo.length;
    console.log(`New string is ${changeToLength.toString()} characters long`);

    for (let i = changeToLength; i < currentLength; i++){
      changeTo = changeTo + " ";
      console.log(`ChangeTo is now ${changeTo.length} characters long`);
    }

    console.log(`Changing to: ${changeTo}`);
    await this.page.keyboard.type(changeTo);
  }

  async changeCodeMirrorAllCode(codeMirrorBlock: number, changeTo: string){

    await this.page.locator('.CodeMirror-code').nth(codeMirrorBlock).click();

     if (process.platform === 'darwin') {
        await this.page.keyboard.press('Meta+A'); // Cmd+A on Mac
      } else {
        await this.page.keyboard.press('Control+A'); //Control+A on Windows
      }

      await this.page.keyboard.press('Delete');
      await this.page.keyboard.type(changeTo, { delay: 50 });
    };

    async waitForCodeLens(){
      await this.page.locator('text=Building your visualization').waitFor({ state: 'detached' }); //To detach the text "Loading a dynamic question..."
    }

  
}