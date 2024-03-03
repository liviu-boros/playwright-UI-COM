import { Locator, Page } from "@playwright/test";

export const NavItem = (anchor: Locator | Page, text: string) => {
  let locator: Locator;

  locator = anchor.locator(`a.mat-list-item :text-is("${text}")`);

  return locator;
};
