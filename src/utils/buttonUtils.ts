import { Locator, expect } from "@playwright/test";

/**
 * Validates the activity number and returns the correct locator.
 */
export function getValidatedLocator(
  activityNumber: number,
  locators: Locator[],
  locatorType: string
): Locator {
  if (activityNumber < 1 || activityNumber > locators.length) {
    throw new Error(
      `Invalid activity number: ${activityNumber} for ${locatorType}`
    );
  }
  return locators[activityNumber - 1];
}

/**
 * Generic button click helper with visibility check.
 */
export async function clickButton(
  activityNumber: number,
  buttons: Locator[],
  buttonName: string,
  checkVisibility = false
) {
  const button = getValidatedLocator(
    activityNumber,
    buttons,
    `${buttonName} Button`
  );

  if (checkVisibility && !(await button.isVisible())) {
    throw new Error(
      `${buttonName} is not visible for Activity ${activityNumber}`
    );
  }

  await button.click();
}
export async function toggleSourceContent(
  sourceContent: Locator,
  hideSourceButton: Locator,
  activityNumber: number
) {
  // Ensure the source content is visible
  await expect(sourceContent).toBeVisible({ timeout: 5000 });
  // Click "Hide Source" button
  await hideSourceButton.click();
  console.log(`Clicking "Hide Source" button for Activity ${activityNumber}`);
  // Ensure the source content is hidden
  await expect(sourceContent).not.toBeVisible({ timeout: 5000 });
}
