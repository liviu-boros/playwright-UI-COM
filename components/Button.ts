import { Locator, Page } from "@playwright/test";

export const ToggleButton = (anchor: Locator | Page, text: string) => {
  let locator: Locator;

  locator = anchor.locator(`mat-button-toggle:has-text("${text}")`);

  return locator;
};

export const Button = (anchor: Locator | Page, text: string) => {
  let locator: Locator;

  locator = anchor.locator(`button:has-text("${text}")`);

  return locator;
};

export const LinkButton = (anchor: Locator | Page, text: string) => {
  let locator: Locator;

  locator = anchor.locator(`a:has-text("${text}")`);

  return locator;
};
