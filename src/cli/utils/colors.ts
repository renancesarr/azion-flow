const RESET = "\u001b[0m";
const GREEN = "\u001b[32m";
const CYAN = "\u001b[36m";
const YELLOW = "\u001b[33m";
const RED = "\u001b[31m";
const MAGENTA = "\u001b[35m";

function wrap(code: string, text: string): string {
  return `${code}${text}${RESET}`;
}

export function success(text: string): string {
  return wrap(GREEN, text);
}

export function info(text: string): string {
  return wrap(CYAN, text);
}

export function warn(text: string): string {
  return wrap(YELLOW, text);
}

export function error(text: string): string {
  return wrap(RED, text);
}

export function highlight(text: string): string {
  return wrap(MAGENTA, text);
}
