import { test, expect } from "@playwright/test";

test.describe("JsonEditor Component", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:3000/");
  });

  test("should render the JSON Editor heading", async ({page}) => {
    const heading = await page.locator("#Json-editor-title");
    await expect(heading).toBeVisible();
  });

  test("should render the JSON editor",async({page}) => {
    const editor = await page.locator(".monaco-editor").nth(0);
    await expect(editor).toBeVisible();

  });
})