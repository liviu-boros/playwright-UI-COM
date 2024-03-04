const playwright = require("playwright");
import { test, expect, Page, Browser, BrowserContext } from "@playwright/test";
import { Button } from "../components/Button";
import { NavItem } from "../components/NavItem";
import { Section } from "../components/Sections";

test("All buttons are working as expected", async ({}) => {
  const browser: Browser = await playwright.chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const play: Page = await context.newPage();

  await play.goto("https://v14.material.angular.io/components/categories");
  await play.waitForURL("**/categories");

  await Button(play, "Ok, Got it").click();

  await NavItem(play, "Button").click();
  await play.waitForURL("**/button/overview");

  await play.getByRole("link", { name: "examples" }).click();
  await play.waitForURL("**/button/examples");

  const BasicSection = Section(play, {
    title: "Basic",
    buttons: ["Basic", "Primary", "Accent", "Warn", "Disabled"],
    linkButtons: ["Link"],
  });
  await BasicSection.Button("Basic").click();
  await BasicSection.Button("Primary").click();
  await BasicSection.Button("Accent").click();
  await BasicSection.Button("Warn").click();
  await expect(BasicSection.Button("Disabled")).toBeDisabled();
  await BasicSection.LinkButton("Link").click();

  const RaisedSection = Section(play, {
    title: "Raised",
    buttons: ["Basic", "Primary", "Accent", "Warn", "Disabled"],
    linkButtons: ["Link"],
  });
  await RaisedSection.Button("Basic").click();
  await RaisedSection.Button("Primary").click();
  await RaisedSection.Button("Accent").click();
  await RaisedSection.Button("Warn").click();
  await expect(RaisedSection.Button("Disabled")).toBeDisabled();
  await RaisedSection.LinkButton("Link").click();

  const StrokedSection = Section(play, {
    title: "Stroked",
    buttons: ["Basic", "Primary", "Accent", "Warn", "Disabled"],
    linkButtons: ["Link"],
  });
  await StrokedSection.Button("Basic").click();
  await StrokedSection.Button("Primary").click();
  await StrokedSection.Button("Accent").click();
  await StrokedSection.Button("Warn").click();
  await expect(StrokedSection.Button("Disabled")).toBeDisabled();
  await StrokedSection.LinkButton("Link").click();

  const FlatSection = Section(play, {
    title: "Flat",
    buttons: ["Basic", "Primary", "Accent", "Warn", "Disabled"],
    linkButtons: ["Link"],
  });
  await FlatSection.Button("Basic").click();
  await FlatSection.Button("Primary").click();
  await FlatSection.Button("Accent").click();
  await FlatSection.Button("Warn").click();
  await expect(FlatSection.Button("Disabled")).toBeDisabled();
  await FlatSection.LinkButton("Link").click();
});
