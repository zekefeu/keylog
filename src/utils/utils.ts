/**
 * utils/utils.ts
 * Contains frequently accessed functions
 */

import { Level } from "../types/global";
import colors from "./colors.js";

/**
 * Takes the level you want to get the color of
 * and returns the corresponding ANSI escape code
 */
export function getLevelTheme(level: Level): string {
	if (level === "trace") return colors.gray;
	if (level === "debug") return colors.gray;
	if (level === "info") return colors.blue;
	if (level === "warn") return colors.yellow;
	if (level === "error") return colors.red;
	if (level === "fatal") return colors.red;
	return "";
}
