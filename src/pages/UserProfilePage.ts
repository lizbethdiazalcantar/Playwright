import { Page, expect } from '@playwright/test';
// import {generateUniqueUsername} from '../utils/testRandom';
import { BasePage } from './BasePage';

export class UserProfilePage extends BasePage {
  page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }


// Page element selectors
private deleteAccountCheckbox = "#delacct";
private deleteAccountButton = "input.btn-primary"; 



// Action Methods
async deleteUser() {
  await this.page.click(this.deleteAccountCheckbox); // click the delete checkbox
  await this.clickOKOnDialog(); // wait for the dialogue box (a BasePage method)
  await this.page.click(this.deleteAccountButton); // click the delete button
}

}