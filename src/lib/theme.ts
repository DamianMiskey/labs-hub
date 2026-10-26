// The theme switch: "system" (follow the device), "light" or "dark", kept in
// localStorage on this device. <html data-theme> always holds the resolved
// theme, so CSS only has to look at one attribute.
export type ThemeChoice = "system" | "light" | "dark";
export const THEME_KEY = "theme";

/**
 * Runs inline in <head>, before the page is drawn, so the first paint already
 * has the right colours (no flash of the wrong theme). Kept tiny and
 * dependency-free; storage can be blocked, hence the try.
 */
export const THEME_SCRIPT = `(function(){try{var c=localStorage.getItem("${THEME_KEY}")||"system";var d=c==="dark"||(c==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.theme=d?"dark":"light";document.documentElement.dataset.themeChoice=c}catch(e){}})()`;

export function resolve(choice: ThemeChoice, systemDark: boolean): "light" | "dark" {
  return choice === "system" ? (systemDark ? "dark" : "light") : choice;
}
