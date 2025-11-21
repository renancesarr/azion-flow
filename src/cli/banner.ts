import { highlight, info } from "./utils/colors";

const TITLE = "azion-flow";
const TAGLINE = "static deploy on edge, simplified";

export function banner(): string {
  return `${highlight(TITLE)} • ${info(TAGLINE)}`;
}
