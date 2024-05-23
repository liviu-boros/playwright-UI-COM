import playwright from "playwright";
import { test, expect, Page, Browser, BrowserContext } from "@playwright/test";
import { Button, LinkButton } from "../components/Button";
import { NavItem } from "../components/NavItem";
import { Section, Viewer } from "../components/Frames";
import { setupBrowserPageComponent } from "../setup/setup";

const assertButtonSection = async (
  play: Page,
  viewerName: string,
  sectionName: string,
  buttons: Array<any>,
  disabledButton: string
) => {
  const viewer = Viewer(play, viewerName);
  const section = viewer.locator(Section(play, sectionName));
  for (let i = 0; i < buttons.length; i++) {
    switch (buttons[i]) {
      case "Link":
        await section.locator(LinkButton(play, buttons[i])).click();
        break;
      case disabledButton:
        await expect(section.locator(Button(play, buttons[i]))).toBeDisabled();
        break;
      default:
        await section.locator(Button(play, buttons[i])).click();
    }
  }
};

test("All buttons are working as expected - abstracted", async ({}) => {
  const play = await setupBrowserPageComponent("Button");
  const view = "Basic buttons";
  const basic = ["Basic", "Primary", "Accent", "Warn", "Disabled", "Link"];
  const iconButtons = ["more_vert", "home", "menu", "favorite", "open_in_new"];
  const fabButtons = ["delete", "bookmark", "home", "favorite"];
  const miniFabButtons = ["menu", "plus_one", "filter_list", "home"];

  await assertButtonSection(play, view, "Basic", basic, "Disabled");
  await assertButtonSection(play, view, "Raised", basic, "Disabled");
  await assertButtonSection(play, view, "Stroked", basic, "Disabled");
  await assertButtonSection(play, view, "Flat", basic, "Disabled");
  await assertButtonSection(play, view, "Icon", iconButtons, "open_in_new");
  await assertButtonSection(play, view, "FAB", fabButtons, "favorite");
  await assertButtonSection(play, view, "Mini FAB", miniFabButtons, "home");
});

test("All buttons are working as expected - step by step", async ({}) => {
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

  const Basic_Basic_buttons = Viewer(play, "Basic buttons").locator(
    Section(play, "Basic")
  );

  await Basic_Basic_buttons.locator(Button(play, "Basic")).click();
  await Basic_Basic_buttons.locator(Button(play, "Primary")).click();
  await Basic_Basic_buttons.locator(Button(play, "Accent")).click();
  await Basic_Basic_buttons.locator(Button(play, "Warn")).click();
  await expect(
    Basic_Basic_buttons.locator(Button(play, "Disabled"))
  ).toBeDisabled();
  await Basic_Basic_buttons.locator(LinkButton(play, "Link")).click();

  const Basic_Raised_buttons = Viewer(play, "Basic buttons").locator(
    Section(play, "Raised")
  );

  await Basic_Raised_buttons.locator(Button(play, "Basic")).click();
  await Basic_Raised_buttons.locator(Button(play, "Primary")).click();
  await Basic_Raised_buttons.locator(Button(play, "Accent")).click();
  await Basic_Raised_buttons.locator(Button(play, "Warn")).click();
  await expect(
    Basic_Raised_buttons.locator(Button(play, "Disabled"))
  ).toBeDisabled();
  await Basic_Raised_buttons.locator(LinkButton(play, "Link")).click();

  const Basic_Stroked_buttons = Viewer(play, "Basic buttons").locator(
    Section(play, "Stroked")
  );

  await Basic_Stroked_buttons.locator(Button(play, "Basic")).click();
  await Basic_Stroked_buttons.locator(Button(play, "Primary")).click();
  await Basic_Stroked_buttons.locator(Button(play, "Accent")).click();
  await Basic_Stroked_buttons.locator(Button(play, "Warn")).click();
  await expect(
    Basic_Stroked_buttons.locator(Button(play, "Disabled"))
  ).toBeDisabled();
  await Basic_Stroked_buttons.locator(LinkButton(play, "Link")).click();

  const Basic_Flat_buttons = Viewer(play, "Basic buttons").locator(
    Section(play, "Flat")
  );

  await Basic_Flat_buttons.locator(Button(play, "Basic")).click();
  await Basic_Flat_buttons.locator(Button(play, "Primary")).click();
  await Basic_Flat_buttons.locator(Button(play, "Accent")).click();
  await Basic_Flat_buttons.locator(Button(play, "Warn")).click();
  await expect(
    Basic_Flat_buttons.locator(Button(play, "Disabled"))
  ).toBeDisabled();
  await Basic_Flat_buttons.locator(LinkButton(play, "Link")).click();

  const Basic_Icon_buttons = Viewer(play, "Basic buttons").locator(
    Section(play, "Icon")
  );

  await Basic_Icon_buttons.locator(Button(play, "more_vert")).click();
  await Basic_Icon_buttons.locator(Button(play, "home")).click();
  await Basic_Icon_buttons.locator(Button(play, "menu")).click();
  await Basic_Icon_buttons.locator(Button(play, "favorite")).click();
  await expect(
    Basic_Icon_buttons.locator(Button(play, "open_in_new"))
  ).toBeDisabled();

  const Basic_FAB_buttons = Viewer(play, "Basic buttons").locator(
    Section(play, "FAB")
  );

  await Basic_FAB_buttons.locator(Button(play, "delete")).click();
  await Basic_FAB_buttons.locator(Button(play, "bookmark")).click();
  await Basic_FAB_buttons.locator(Button(play, "home")).click();
  await expect(
    Basic_FAB_buttons.locator(Button(play, "favorite"))
  ).toBeDisabled();

  const Basic_miniFAB_buttons = Viewer(play, "Basic buttons").locator(
    Section(play, "Mini FAB")
  );

  await Basic_miniFAB_buttons.locator(Button(play, "menu")).click();
  await Basic_miniFAB_buttons.locator(Button(play, "plus_one")).click();
  await Basic_miniFAB_buttons.locator(Button(play, "filter_list")).click();
  await expect(
    Basic_miniFAB_buttons.locator(Button(play, "home"))
  ).toBeDisabled();
});
