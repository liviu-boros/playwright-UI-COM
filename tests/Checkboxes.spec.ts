import playwright from "playwright";
import { test, expect, Page, Browser, BrowserContext } from "@playwright/test";
import { Button } from "../components/Button";
import { NavItem } from "../components/NavItem";
import { Viewer } from "../components/Frames";
import { Checkbox } from "../components/Checkbox";

test("Checkboxes are working as expected - step by step", async ({}) => {
  const browser: Browser = await playwright.chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const play: Page = await context.newPage();

  await play.goto("https://v14.material.angular.io/components/categories");
  await play.waitForURL("**/categories");

  await Button(play, "Ok, Got it").click();

  await NavItem(play, "Checkbox").click();
  await play.waitForURL("**/checkbox/overview");

  await play.getByRole("link", { name: "examples" }).click();
  await play.waitForURL("**/checkbox/examples");

  const section = Viewer(play, "Configurable checkbox");

  await section.locator(Checkbox(play, "Checked")).click();
  await expect(section.locator(Checkbox(play, "Checked"))).toHaveClass(
    /mat-checkbox-checked/
  );
  await expect(section.locator(Checkbox(play, "I'm a checkbox"))).toHaveClass(
    /mat-checkbox-checked/
  );

  await section.locator(Checkbox(play, "Indeterminate")).click();
  await expect(section.locator(Checkbox(play, "Indeterminate"))).toHaveClass(
    /mat-checkbox-checked/
  );
  await expect(section.locator(Checkbox(play, "I'm a checkbox"))).toHaveClass(
    /mat-checkbox-indeterminate/
  );

  await section.locator(Checkbox(play, "Checked")).click();
  await expect(section.locator(Checkbox(play, "Checked"))).not.toHaveClass(
    /mat-checkbox-checked/
  );
  await expect(section.locator(Checkbox(play, "I'm a checkbox"))).toHaveClass(
    /mat-checkbox-indeterminate/
  );

  await section.locator(Checkbox(play, "Indeterminate")).click();
  await expect(
    section.locator(Checkbox(play, "I'm a checkbox"))
  ).not.toHaveClass(/mat-checkbox-checked/);
  await expect(
    section.locator(Checkbox(play, "I'm a checkbox"))
  ).not.toHaveClass(/mat-checkbox-indeterminate/);
});
