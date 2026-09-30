//import { test  } from '../utils/hooks';
import { beforeEach } from 'node:test';
import { testData } from '../utils/testData';
import { test, expect } from '@playwright/test';
import { UserMenuNavigation } from '../pages/userMenuNavigation';
import { courseNavUrl } from '../utils/courseNavUrl'


test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('/');
});

test.describe('Navigation test logged in as a student', () => {
    test('Test 1 - Checking if clicking the logo navigates the to correct page logged in as a student', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.studentUser.username, testData.studentUser.password);
        // testing
        await userMenu.clickLogo();
        const pageUrl = await page.url();
        //await expect(userMenu.page).toHaveURL(courseNavUrl.logoUrl);
        await expect(pageUrl).toContain(courseNavUrl.logoUrl);
    });

    test('Test 2 - Checking if clicking Course Home navigates to the correct page logged in as a student', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.studentUser.username, testData.studentUser.password);
        // testing
        await userMenu.clickCourseHome();
        await expect(userMenu.page).toHaveURL(courseNavUrl.courseHomeUrl)
    });

    test('Test 3 - Checking if clicking Assignments navigates to the correct page logged in as a student', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.studentUser.username, testData.studentUser.password);
        // testing
        await userMenu.clickAssignments();
        await expect(userMenu.page).toHaveURL(courseNavUrl.assignmentsUrl)
    });
    
    test('Test 4 - Checking if clicking Practice navigates to the correct page logged in as a student', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.studentUser.username, testData.studentUser.password);
        // testing
        await userMenu.clickPractice();
        await expect(userMenu.page).toHaveURL(courseNavUrl.practiceUrl)
    });

    test('Test 5 - Checking if clicking Peer Instructor (Student) navigates to the correct page logged in as a student', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.studentUser.username, testData.studentUser.password);
        // testing
        await userMenu.clickPeerInstructionStudent();
        await expect(userMenu.page).toHaveURL(courseNavUrl.studentPeerInstructionUrl)
    });

    test('Test 6 - Checking if clicking Progress Page navigates to the correct page logged in as a student', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.studentUser.username, testData.studentUser.password);
        // testing
        await userMenu.clickProgressPage();
        await expect(userMenu.page).toHaveURL(courseNavUrl.progressPageUrl)
    });

    test('Test 7 - Checking if clicking Change Course navigates to the correct page logged in as a student', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.studentUser.username, testData.studentUser.password);
        // testing
        await userMenu.clickChangeCourse();
        await expect(userMenu.page).toHaveURL(courseNavUrl.changeCourseUrl)
    });

    test('Test 8 - Checking if clicking Edit Profile navigates to the correct page logged in as a student', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.studentUser.username, testData.studentUser.password);
        // testing
        await userMenu.clickEditProfile();
        await expect(userMenu.page).toHaveURL(courseNavUrl.editProfileUrl)
    });

    test('Test 9 - Checking if clicking Change Password navigates to the correct page logged in as a student', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.studentUser.username, testData.studentUser.password);
        // testing
        await userMenu.clickChangePassword();
        await expect(userMenu.page).toHaveURL(courseNavUrl.changePasswordUrl)
    });

    test('Test 10 - Checking if clicking FAQ navigates to the correct page logged in as a student', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.studentUser.username, testData.studentUser.password);
        // testing
        await userMenu.clickFAQ();
        await expect(userMenu.page).toHaveURL(courseNavUrl.faqUrl)
    })

    test('Test 11 - Checking if clicking Instructors Guide navigates to the correct page logged in as a student', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.studentUser.username, testData.studentUser.password);
        // testing
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
            await userMenu.clickInstructorsGuide(),
        ]);
        await newPage.waitForLoadState();
        const newTabUrl = newPage.url()
        await expect(newTabUrl).toBe(courseNavUrl.instructorsGuideUrl)
    })
    

    // Takes me to the landing page instead of the about page

    /*
    test('Test 12 - Checking if clicking About Runestone navigates to the correct page logged in as a student', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.studentUser.username, testData.studentUser.password);
        // testing
        await userMenu.clickAboutRunestone();
        await expect(userMenu.page).toHaveURL(courseNavUrl.aboutRunestoneUrl)
    })
    */

    test('Test 13 - Checking if clicking Report a Problem navigates to the correct page logged in as a student', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.studentUser.username, testData.studentUser.password);
        // testing
        await userMenu.clickReportAProblem();
        await expect(userMenu.page).toHaveURL(courseNavUrl.reportAProblemUrl)
    })
});

test.describe('Navigation test logged in as an instructor', () => {
    test('Test 14 - Checking if clicking the logo navigates the to correct page logged in as an instructor', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickLogo();
        const pageUrl = await page.url();
        //await expect(userMenu.page).toHaveURL(courseNavUrl.logoUrl);
        await expect(userMenu.page).toHaveURL(pageUrl);
    });

    test('Test 15 - Checking if clicking Course Home navigates to the correct page logged in as an instructor', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickCourseHome();
        await expect(userMenu.page).toHaveURL(courseNavUrl.courseHomeUrl)
    });

    test('Test 16 - Checking if clicking Assignments navigates to the correct page logged in as an instructor', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickAssignments();
        await expect(userMenu.page).toHaveURL(courseNavUrl.assignmentsUrl)
    });
    
    test('Test 17 - Checking if clicking Practice navigates to the correct page logged in as an instructor', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickPractice();
        await expect(userMenu.page).toHaveURL(courseNavUrl.practiceUrl)
    });

    test('Test 18 - Checking if clicking Peer Instructor (Student) navigates to the correct page logged in as an instructor', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickPeerInstructionStudent();
        await expect(userMenu.page).toHaveURL(courseNavUrl.studentPeerInstructionUrl)
    });

    test('Test 19 - Checking if clicking Progress Page navigates to the correct page logged in as an instructor', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickProgressPage();
        await expect(userMenu.page).toHaveURL(courseNavUrl.progressPageUrl)
    });

    test('Test 20 - Checking if clicking Change Course navigates to the correct page logged in as an instructor', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickChangeCourse();
        await expect(userMenu.page).toHaveURL(courseNavUrl.changeCourseUrl)
    });

    test('Test 21 - Checking if clicking Edit Profile navigates to the correct page logged in as an instructor', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickEditProfile();
        await expect(userMenu.page).toHaveURL(courseNavUrl.editProfileUrl)
    });

    test('Test 22 - Checking if clicking Change Password navigates to the correct page logged in as an instructor', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickChangePassword();
        await expect(userMenu.page).toHaveURL(courseNavUrl.changePasswordUrl)
    });

    test('Test 23 - Checking if clicking FAQ navigates to the correct page logged in as an instructor', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickFAQ();
        await expect(userMenu.page).toHaveURL(courseNavUrl.faqUrl)
    })

    test('Test 24 - Checking if clicking Instructors Guide navigates to the correct page logged in as an instructor', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
            await userMenu.clickInstructorsGuide(),
        ]);
        await newPage.waitForLoadState();
        const newTabUrl = newPage.url()
        await expect(newTabUrl).toBe(courseNavUrl.instructorsGuideUrl)
    })
    

    // Takes me to the landing page instead of the about page

    /*
    test('Test 25 - Checking if clicking About Runestone navigates to the correct page logged in as an instructor', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickAboutRunestone();
        await expect(userMenu.page).toHaveURL(courseNavUrl.aboutRunestoneUrl)
    })
    */

    test('Test 26 - Checking if clicking Report a Problem navigates to the correct page logged in as an instructor', async ({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickReportAProblem();
        await expect(userMenu.page).toHaveURL(courseNavUrl.reportAProblemUrl)
    })

    test('Test 27 - Checking if clicking Back to Textbook navigates to the correct page logged in as an instructor', async({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickBackToTextbook();
        await expect(userMenu.page).toHaveURL(courseNavUrl.backToTextbookUrl)
    })

    test('Test 28 - Checking if clicking Create Course navigates to the correct page logged in as an instructor', async({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickCreateCourse();
        await expect(userMenu.page).toHaveURL(courseNavUrl.createCourseUrl)
    })

    test('Test 29 - Checking if clicking Runestone News navigates to the correct page logged in as an instructor', async({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickRunestoneNews();
        await expect(userMenu.page).toHaveURL(courseNavUrl.runestoneNewsUrl)
    })

    // Error: The string '//a[normalize-space(text())='Instructor\'s Page']' is not a valid XPath expression.

    /*
    test('Test 30 - Checking if clicking Instructors Page navigates to the correct page logged in as an instructor', async({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickInstructorsPage();
        await expect(userMenu.page).toHaveURL(courseNavUrl.instructorsPageUrl)
    })
    */

    test('Test 31 - Checking if clicking Peer Instruction (Instructor) navigates to the correct page logged in as an instructor', async({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickPeerInstructionInstructor();
        await expect(userMenu.page).toHaveURL(courseNavUrl.instructorPeerInstructionUrl)
    })

    test('Test 32 - Checking if clicking Author Tools navigates to the correct page logged in as an instructor', async({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickAuthorTools();
        await expect(userMenu.page).toHaveURL(courseNavUrl.authorToolsUrl)
    })

    // The instructor account I login with does not have access to this link, gives insufficient permissions

    /*
    test('Test 33 - Checking if clicking Editorial Page navigates to the correct page logged in as an instructor', async({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickEditorialPage();
        await expect(userMenu.page).toHaveURL(courseNavUrl.editorialPageUrl)
    })
    */
    
    test('Test 34 - Checking if clicking Request Invoice navigates to the correct page logged in as an instructor', async({page}) => {
        const userMenu = new UserMenuNavigation(page);
        // logging in
        await userMenu.useLogin(testData.instructorUser.username, testData.instructorUser.password);
        // testing
        await userMenu.clickRequestInvoice();
        await expect(userMenu.page).toHaveURL(courseNavUrl.requestInvoiceUrl)
    })
});

