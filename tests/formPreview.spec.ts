import test, { expect } from "@playwright/test";

test.describe("FormPreview Component", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:3000/");
  });

  test('should render a message if schema is null',async ({page}) => {
    const message = await page.locator('#null-schema-component');
    await expect(message).toBeVisible();
  });
});