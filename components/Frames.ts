import { Locator, Page } from "@playwright/test";

export const Viewer = (anchor: Locator | Page, text: string): Locator => {
  let locator: Locator;

  locator = anchor.locator("example-viewer");

  locator = locator.filter({ hasText: text });

  return locator;
};

export const Section = (anchor: Locator | Page, text: string): Locator => {
  let locator: Locator;

  locator = anchor.locator("section");

  locator = locator.filter({
    has: anchor.locator(`div.example-label:text-is("${text}")`),
  });

  return locator;
};

export const Paragraph = (anchor: Locator | Page, text: string) => {
  let locator: Locator;

  locator = anchor.locator(`p`);

  locator = locator.filter({ hasText: text });

  return locator;
};
