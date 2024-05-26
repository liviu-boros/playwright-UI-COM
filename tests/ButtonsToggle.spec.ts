import playwright from "playwright";
import { test, expect, Page, Browser, BrowserContext } from "@playwright/test";
import { Button, ToggleButton } from "../components/Button";
import { NavItem } from "../components/NavItem";
import { Paragraph } from "../components/Frames";

test("Toggle buttons are working as expected - step by step", async ({}) => {
  const browser: Browser = await playwright.chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const play: Page = await context.newPage();

  await play.goto("https://v14.material.angular.io/components/categories");
  await play.waitForURL("**/categories");

  await Button(play, "Ok, Got it").click();

  await NavItem(play, "Button toggle").click();
  await play.waitForURL("**/button-toggle/overview");

  await play.getByRole("link", { name: "examples" }).click();
  await play.waitForURL("**/button-toggle/examples");

  const Default = Paragraph(play, "Default appearance");
  const Legacy = Paragraph(play, "Legacy appearance");
  await expect(Default).toBeAttached();
  await expect(Legacy).toBeAttached();

  await Default.locator(ToggleButton(play, "Bold")).click();
  await expect(Default.locator(ToggleButton(play, "Bold"))).toHaveClass(
    /mat-button-toggle-checked/
  );

  await Default.locator(ToggleButton(play, "Italic")).click();
  await expect(Default.locator(ToggleButton(play, "Bold"))).not.toHaveClass(
    /mat-button-toggle-checked/
  );
  await expect(Default.locator(ToggleButton(play, "Italic"))).toHaveClass(
    /mat-button-toggle-checked/
  );

  await Default.locator(ToggleButton(play, "Underline")).click();
  await expect(Default.locator(ToggleButton(play, "Italic"))).not.toHaveClass(
    /mat-button-toggle-checked/
  );
  await expect(Default.locator(ToggleButton(play, "Underline"))).toHaveClass(
    /mat-button-toggle-checked/
  );

  await Legacy.locator(ToggleButton(play, "Bold")).click();
  await expect(Legacy.locator(ToggleButton(play, "Bold"))).toHaveClass(
    /mat-button-toggle-checked/
  );

  await Legacy.locator(ToggleButton(play, "Italic")).click();
  await expect(Legacy.locator(ToggleButton(play, "Bold"))).not.toHaveClass(
    /mat-button-toggle-checked/
  );
  await expect(Legacy.locator(ToggleButton(play, "Italic"))).toHaveClass(
    /mat-button-toggle-checked/
  );

  await Legacy.locator(ToggleButton(play, "Underline")).click();
  await expect(Legacy.locator(ToggleButton(play, "Italic"))).not.toHaveClass(
    /mat-button-toggle-checked/
  );
  await expect(Legacy.locator(ToggleButton(play, "Underline"))).toHaveClass(
    /mat-button-toggle-checked/
  );
});
