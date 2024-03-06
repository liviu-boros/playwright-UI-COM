const playwright = require("playwright");
import { test, expect, Page, Browser, BrowserContext } from "@playwright/test";
import { Button } from "../components/Button";
import { NavItem } from "../components/NavItem";
import { Paragraph } from "../components/Sections";

let play: Page;

test.beforeEach(async ({}) => {
  const browser: Browser = await playwright.chromium.launch();
  const context: BrowserContext = await browser.newContext();
  play = await context.newPage();

  await play.goto("https://v14.material.angular.io/components/categories");
  await play.waitForURL("**/categories");
  await Button(play, "Ok, Got it").click();

  await NavItem(play, "Button toggle").click();
  await play.waitForURL("**/button-toggle/overview");

  await play.getByRole("link", { name: "examples" }).click();
  await play.waitForURL("**/button-toggle/examples");
});

test("All Default appearance toggle buttons are working as expected", async ({}) => {
  const DefaultParagraph = Paragraph(play, {
    title: "Default appearance",
    buttons: ["Bold", "Italic", "Underline"],
  });
  await expect(DefaultParagraph).toBeAttached();

  await DefaultParagraph.ToggleButton("Bold").click();
  await expect(DefaultParagraph.ToggleButton("Bold")).toHaveClass(
    /mat-button-toggle-checked/
  );

  await DefaultParagraph.ToggleButton("Italic").click();
  await expect(DefaultParagraph.ToggleButton("Bold")).not.toHaveClass(
    /mat-button-toggle-checked/
  );
  await expect(DefaultParagraph.ToggleButton("Italic")).toHaveClass(
    /mat-button-toggle-checked/
  );

  await DefaultParagraph.ToggleButton("Underline").click();
  await expect(DefaultParagraph.ToggleButton("Italic")).not.toHaveClass(
    /mat-button-toggle-checked/
  );
  await expect(DefaultParagraph.ToggleButton("Underline")).toHaveClass(
    /mat-button-toggle-checked/
  );
});

test("All Legacy appearance toggle buttons are working as expected", async ({}) => {
  const LegacyParagraph = Paragraph(play, {
    title: "Legacy appearance",
    buttons: ["Bold", "Italic", "Underline"],
  });
  await expect(LegacyParagraph).toBeAttached();

  await LegacyParagraph.ToggleButton("Bold").click();
  await expect(LegacyParagraph.ToggleButton("Bold")).toHaveClass(
    /mat-button-toggle-checked/
  );

  await LegacyParagraph.ToggleButton("Italic").click();
  await expect(LegacyParagraph.ToggleButton("Bold")).not.toHaveClass(
    /mat-button-toggle-checked/
  );
  await expect(LegacyParagraph.ToggleButton("Italic")).toHaveClass(
    /mat-button-toggle-checked/
  );

  await LegacyParagraph.ToggleButton("Underline").click();
  await expect(LegacyParagraph.ToggleButton("Italic")).not.toHaveClass(
    /mat-button-toggle-checked/
  );
  await expect(LegacyParagraph.ToggleButton("Underline")).toHaveClass(
    /mat-button-toggle-checked/
  );
});
