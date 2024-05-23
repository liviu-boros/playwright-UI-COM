import playwright from "playwright";
import { test, Page, Browser, BrowserContext } from "@playwright/test";
import { Button } from "../components/Button";
import { NavItem } from "../components/NavItem";
import { setupBrowserPage } from "../setup/setup";

const navigatePages = async (play: Page, pages: Array<string>) => {
  for (const element of pages) {
    await NavItem(play, element).click();
    await play.waitForURL(
      `**/${element.replace(" ", "-").toLowerCase()}/overview`
    );
    if (element !== "Core") {
      await play.getByRole("link", { name: "examples" }).click();
      await play.waitForURL(
        `**/${element.replace(" ", "-").toLowerCase()}/examples`
      );
    }
  }
};

test("All navigation left bar items are working as expected - abstracted", async ({}) => {
  const pages = [
    "Autocomplete",
    "Badge",
    "Bottom Sheet",
    "Button",
    "Button toggle",
    "Card",
    "Checkbox",
    "Chips",
    "Core",
    "Datepicker",
    "Dialog",
    "Divider",
    "Form field",
  ];

  const play = await setupBrowserPage();

  await navigatePages(play, pages);
});

test("All navigation left bar items are working as expected - step by step", async ({}) => {
  const browser: Browser = await playwright.chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const play: Page = await context.newPage();

  await play.goto("/");
  await play.goto("/components/categories");
  await play.waitForURL("**/categories");

  await Button(play, "Ok, Got it").click();

  await NavItem(play, "Autocomplete").click();
  await play.waitForURL("**/autocomplete/overview");

  await NavItem(play, "Badge").click();
  await play.waitForURL("**/badge/overview");

  await NavItem(play, "Bottom Sheet").click();
  await play.waitForURL("**/bottom-sheet/overview");

  await NavItem(play, "Button").click();
  await play.waitForURL("**/button/overview");

  await NavItem(play, "Button toggle").click();
  await play.waitForURL("**/button-toggle/overview");

  await NavItem(play, "Card").click();
  await play.waitForURL("**/card/overview");

  await NavItem(play, "Checkbox").click();
  await play.waitForURL("**/checkbox/overview");

  await NavItem(play, "Chips").click();
  await play.waitForURL("**/chips/overview");

  await NavItem(play, "Core").click();
  await play.waitForURL("**/core/overview");

  await NavItem(play, "Datepicker").click();
  await play.waitForURL("**/datepicker/overview");

  await NavItem(play, "Dialog").click();
  await play.waitForURL("**/dialog/overview");

  await NavItem(play, "Divider").click();
  await play.waitForURL("**/divider/overview");

  await NavItem(play, "Expansion Panel").click();
  await play.waitForURL("**/expansion/overview");

  await NavItem(play, "Form field").click();
  await play.waitForURL("**/form-field/overview");
});
