import { Locator, Page } from "@playwright/test";
import { Button, LinkButton, ToggleButton } from "./Button";

export const Section = (anchor: Locator | Page, options: any) => {
  let locator: Locator;

  locator = anchor.locator("section");

  locator = locator.filter({
    has: anchor.locator(`.example-label:has-text("${options.title}")`),
  });

  if (options.buttons) {
    options.buttons.forEach((element) => {
      locator = locator.filter({
        has: Button(anchor, element),
      });
    });
  }

  if (options.linkButtons) {
    options.linkButtons.forEach((element) => {
      locator = locator.filter({
        has: LinkButton(anchor, element),
      });
    });
  }

  locator["Button"] = (text: string): Locator => {
    return Button(locator, text);
  };

  locator["LinkButton"] = (text: string): Locator => {
    return LinkButton(locator, text);
  };

  return locator as Locator & {
    Button: (text: string) => Locator;
  } & {
    LinkButton: (text: string) => Locator;
  };
};

export const Paragraph = (anchor: Locator | Page, options: any) => {
  let locator: Locator;

  locator = anchor.locator(`p:has-text("${options.title}")`);

  if (options.buttons) {
    options.buttons.forEach((element) => {
      locator = locator.filter({
        has: ToggleButton(anchor, element),
      });
    });
  }

  locator["ToggleButton"] = (text: string): Locator => {
    return ToggleButton(locator, text);
  };

  return locator as Locator & {
    ToggleButton: (text: string) => Locator;
  };
};
