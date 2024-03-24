const playwright = require("playwright");
import { test, expect, Page, Browser, BrowserContext } from "@playwright/test";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { NavItem } from "../components/NavItem";

test("All cards are working as expected", async ({}) => {
  const browser: Browser = await playwright.chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const play: Page = await context.newPage();

  await play.goto("https://v14.material.angular.io/components/categories");
  await play.waitForURL("**/categories");

  await Button(play, "Ok, Got it").click();

  await NavItem(play, "Card").click();
  await play.waitForURL("**/card/overview");

  await play.getByRole("link", { name: "examples" }).click();
  await play.waitForURL("**/card/examples");

  const firstCard = Card(play, {
    title: "Actions Buttons",
    subtitle: "Start",
    buttons: ["LIKE", "SHARE"],
  });
  await firstCard.click();
  await firstCard.Button("LIKE").click();
  await firstCard.Button("SHARE").click();

  const secondCard = Card(play, {
    title: "Actions Buttons",
    subtitle: "End",
    buttons: ["LIKE", "SHARE"],
  });
  await secondCard.click();
  await secondCard.Button("LIKE").click();
  await secondCard.Button("SHARE").click();

  const thirdCard = Card(play, {
    title: "Shiba Inu",
    headerImage: true,
    subtitle: "Dog Breed",
    image: true,
    buttons: ["LIKE", "SHARE"],
  });
  await expect(thirdCard).toBeAttached();
  await thirdCard.click();
  await thirdCard.Button("LIKE").click();

  await Card(play, {
    title: "Shiba Inu",
    headerImage: true,
    subtitle: "Dog Breed",
    image: true,
    buttons: ["LIKE", "SHARE"],
  }).click();
});
