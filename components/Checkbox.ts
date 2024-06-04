import { Locator, Page } from "@playwright/test";

export const Checkbox = (anchor: Locator | Page, text: string) => {
  let locator: Locator;

  // locator = anchor.locator(`mat-checkbox:has(span:has-text("${text}"))`);
  locator = anchor.locator(`mat-checkbox`).filter({ hasText: text });

  return locator;
};
