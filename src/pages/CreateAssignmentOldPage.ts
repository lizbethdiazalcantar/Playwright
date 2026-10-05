import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { Course } from '../data/course';
import { BasePage } from './BasePage';
import { UserMenuNavigation } from './userMenuNavigation';
import { Assignment } from '../data/assignment';

export class CreateAssignmentOldPage extends BasePage{
  page: Page;

  addButton = 'button[data-target="#addAssignment"]';
  
  // Add Assignment Modal Dialog
  addAssignmentModal = '#myAddModalLabel';
  addAssignmentNameEditBox = '#name';
  addAssignmentDuplicateDropdown = '#duplicate';
  addAssignmentCreateButton = 'input[type="button"][value="Create"]';

  saveButton = 'input[type="button"][value="Save"]';


  constructor(page: Page) {
    super(page);
    this.page = page;
    
  }

  async goToOldAssignmentForm() {

    this.page.goto('runestone/admin/assignments');

  }

  async completeAddAssignmentModal(assignment: Assignment, duplicate?: string){

    await this.page.locator(this.addAssignmentNameEditBox).fill(assignment.name);

    if(duplicate){
      //this.page.locator(this.addAssignmentDuplicateDropdown).selectOption(duplicate);
      await this.page.locator(this.addAssignmentDuplicateDropdown).click();
      await this.page.selectOption(this.addAssignmentDuplicateDropdown, { label: duplicate });
    }
    await this.page.locator(this.addAssignmentCreateButton).click();
    
  }


}