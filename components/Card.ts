import { Locator, Page } from "@playwright/test";
import { Button } from "./Button";

/**
 * Interface for the options object passed to the Card function.
 *
 * @type  {string} title - The title of the card.
 * @property {boolean} [headerImage] - Whether the card has a header image.
 * @property {string} [subtitle] - The subtitle of the card.
 * @property {boolean} [image] - Whether the card has an image.
 * @property {string[]} [buttons] - The buttons on the card.
 */
interface CardOptions {
  title: string;
  headerImage?: boolean;
  subtitle?: string;
  image?: boolean;
  buttons?: string[];
}

/**
 * Function to create a locator for a card element.
 *
 * This method creates a locator for a card by performing the following steps:
 * - Start from the given anchor locator.
 * - Filter the locator based on the given options.
 * - Add a Button method to the locator.
 *
 * Usage:
 *
 * ```typescript
 * const card = Card(page.locator('mat-card'), {
 *   title: "Shiba Inu",
 *   headerImage: true,
 *   subtitle: "Dog Breed",
 *   image: true,
 *   buttons: ["LIKE", "SHARE"],
 * });
 * await card.click();
 * await card.Button("LIKE").click();
 * ```
 *
 * @param {Locator} anchor -- The locator to start from.
 * @param {CardOptions} options - The options for the card.
 * @returns {Locator & { Button: (text: string) => Locator }} A locator for the card, with a Button method to find a button within the card.
 */
export const Card = (anchor: Locator | Page, options: CardOptions) => {
  let locator: Locator;

  locator = anchor.locator("mat-card");

  locator = locator.filter({
    has: anchor.locator(`mat-card-title:has-text("${options.title}")`),
  });

  if (options.headerImage) {
    locator = locator.filter({
      has: anchor.locator(`.mat-card-avatar`),
    });
  }

  if (options.subtitle) {
    locator = locator.filter({
      has: anchor.locator(`mat-card-subtitle:has-text("${options.subtitle}")`),
    });
  }

  if (options.image && options.image === true) {
    locator = locator.filter({
      has: anchor.locator(`.mat-card-image`),
    });
  }

  if (options.buttons) {
    for (const button of options.buttons)
      locator = locator.filter({
        has: Button(anchor, button),
      });
  }

  locator["Button"] = (text: string): Locator => {
    return Button(locator, text);
  };

  return locator as Locator & { Button: (text: string) => Locator };
};
