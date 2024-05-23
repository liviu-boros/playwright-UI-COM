import playwright from "playwright";
import { Page, Browser, BrowserContext } from "@playwright/test";
import { Button } from "../components/Button";
import { NavItem } from "../components/NavItem";

export const setupBrowserPage = async (): Promise<Page> => {
  const browser: Browser = await playwright.chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const play: Page = await context.newPage();

  await play.goto("https://v14.material.angular.io/components/categories");
  await play.waitForURL("**/categories");

  await Button(play, "Ok, Got it").click();
  return play;
};

export const setupBrowserPageComponent = async (
  component: string
): Promise<Page> => {
  const browser: Browser = await playwright.chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const play: Page = await context.newPage();

  await play.goto("https://v14.material.angular.io/components/categories");
  await play.waitForURL("**/categories");

  await Button(play, "Ok, Got it").click();

  await NavItem(play, component).click();
  await play.waitForURL(`**/${component.toLowerCase()}/overview`);

  await play.getByRole("link", { name: "examples" }).click();
  await play.waitForURL(`**/${component.toLowerCase()}/examples`);

  return play;
};
