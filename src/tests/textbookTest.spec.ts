//import { test  } from '../utils/hooks';
import { beforeEach } from 'node:test';
import { LoginPage } from '../pages/loginPage';
//import { CourseHome } from '../pages/courseHomePage';
//import { CourseHomePage } from '../pages/CourseHomePage';
import { CourseHomePage } from '../pages/CourseHomePage';
import { TextbookPage } from '../pages/textbookPage';
import { testData } from '../utils/testData';
import {test,expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  // Given: I am logged in
  await page.goto('/');
  const loginPage = new LoginPage(page);
    await loginPage.login(testData.studentEblue.username, testData.studentEblue.password);
  // And: I click the textbook link in the course home page
    const courseHome = new CourseHomePage(page);
    await courseHome.clickOverview();
    await page.waitForLoadState();
});

test.describe('View Textbook', () => {
  test('should display a content page', async ({ page }) => {
    // When: I click a textbook content
    const textbookPage = new TextbookPage(page);
    await textbookPage.clickChapterOne();
    // Then: the page sould be visible
    await expect(page).toHaveURL('/ns/books/published/DrBrown-Runestone-Overview/ActiveCode/toctree.html');
    await expect(page.getByText("ActiveCode Languages")).toBeVisible();
  });

  test('This Chapter dropdown should work as expected', async ({ page }) => {
    // When: I click a content and the This Chapter button
    const textbookPage = new TextbookPage(page);
    await textbookPage.clickChapterOne();   
    await textbookPage.clickThisChapter();
    // And: I click a menu option in the This Chapter dropdown menu
    await textbookPage.clickChapter1_1();
    // Then: I should see the content page
    await expect(page).toHaveURL('ns/books/published/DrBrown-Runestone-Overview/ActiveCode/python.html');
    await expect(page.getByRole('heading', { name: 'ActiveCode Examples in Python' })).toBeVisible();
  });
  
  test('Should open the annotation sidebar', async ({ page }) => { 
    // When: I click the annotation sidebar button    
    const textbookPage = new TextbookPage(page);
    await textbookPage.clickAnnotationSidebarButton();
    // Then I should see the annotation sidebar
    await expect(page.locator('#sidebar-container')).toBeVisible();    
  });

  test('Should open the user dropdown menu', async ({ page }) => { 
    // When: I click the user dropdown icon    
    const textbookPage = new TextbookPage(page);
    await textbookPage.clickUserMenuIcon();
    // Then: I see the user dropdown menu
    const userText = await textbookPage.getUserText();
    console.log(userText);
    expect(userText).toContain('username: StudentEmily');
  });

  test('Should show the Scratch ActiveCode modal', async ({ page }) => { 
    // When: I click the Scratch ActiveCode icon    
    const textbookPage = new TextbookPage(page);
    await textbookPage.clickScratchACIcon();
    // Then I should see the Scratch ActiveCode modal 
    const scratchACText = await textbookPage.getScratchACText();
    console.log(scratchACText);
    expect(scratchACText).toContain('Scratch ActiveCode (Python)');
  });
  
  test('Should open the help dropdown menu', async ({ page }) => { 
    // When: I click the help dropdown icon    
    const textbookPage = new TextbookPage(page);
    await textbookPage.clickHelpMenuIcon();
    // Then I should see the help dropdown menu
    const helpMenuText = await textbookPage.getHelpMenuText();
    console.log(helpMenuText);
    expect(helpMenuText).toContain('FAQ');
  });

 // //incomplete test - the expected and actual results do not match
  // test('Verify user menu text and link', async ({ page }) => { 
  //   // When: I click the user dropdown icon    
  //   const textbookPage = new TextbookPage(page);
  //   await textbookPage.clickUserMenuIcon();
  //   // Then: I see all the user menu text
  //   const userMenuText = [
  //     'username: StudentEmily',
  //     '',
  //     'Course Home',
  //     'Assignments',
  //     'Practice',
  //     'Peer Instruction (Student)',
  //     '',
  //     'Change Course',
  //     '',
  //     'Progress Page',
  //     '',
  //     'Edit Profile',
  //     'Change Password',
  //     //'Register', => it should exist according to the DevTool but it does not return this value.
  //     'Log Out',
  //     'Dark Mode'
  //   ]

  //   const userMenuListItems = page.locator('.user-menu[0] li'); //wrong locator
  //   console.log(await userMenuListItems.allInnerTexts());
  //   expect(await userMenuListItems.allInnerTexts()).toEqual(userMenuText);
  // });

});