import { test, expect } from "@playwright/test";

test.describe("JsonSchemaExamples Component",() => {
  test.beforeEach(async ({page,context, browserName}) => {
    //firefox and webkit doesn't recognize clipboard-read and write permissions
    if(browserName === 'chromium'){
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    }
    await page.goto('http://localhost:3000/');
  });

  test('should render all examples', async ({page}) => {
    const examples = [
      "User Registration Form",
      "Feedback Form",
      "Event Registration Form",
      "Survey Form",
      "Job Application Form",
      "Travel Booking Form",
      "Newsletter Subscription Form",
      "Product Purchase Form",
      "Contact Us Form",
    ];

    for(let i = 0; i< examples.length;i++){
      const card = page.locator(`#example-card-${i}`);
      await expect(card).toBeVisible();

      const title = page.locator(`#form-title-${i}`);
      await expect(title).toHaveText(examples[i]);
    }
  });

  //mocking the clipboard API for different browsers
  test('should copy JSON to clipboard on click', async ({page,browserName}) => {
    //skipping the clipboard test for the webkit as the permissions aren't allocated for testing and the tests are failing!
    test.skip(browserName === "webkit","Clipboard permissions are not allowed");
    //creating writeText and readText permissions for browsers that don't support!
    if(browserName !== 'chromium'){
      await page.evaluate(() => {
        navigator.clipboard ={
          writeText: async (text) => Promise.resolve(),
          readText: async () => Promise.resolve('"formTitle": "User Registration Form"'),
        };
      });
    }
    const firstCopyDiv = await page.locator(`#example-card-0`);
    await expect(firstCopyDiv).toBeVisible();
    await firstCopyDiv.click();

    const firstCopied = await page.locator(`#copied-0 > span`);
    await expect(firstCopied).toHaveText("Copied!");

    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardContent).toContain('"formTitle": "User Registration Form"');
  })
});
