/**
 * utils/utils.ts
 * Contains frequently accessed functions
 */

import os from "node:os";
import { BuildLogMessageOptions, Level, LogMessage } from "../types/global";

import colors from "./colors.js";

/**
 * Takes the level you want to get the color of
 * and returns the corresponding ANSI escape code
 */
export function getLevelTheme(level: Level): string {
	if (level === "debug") return colors.gray;
	if (level === "info") return colors.blue;
	if (level === "warn") return colors.yellow;
	if (level === "error") return colors.red;
	if (level === "fatal") return colors.red;
	return "";
}

/**
 *
 * @param options
 * @returns
 */
export function buildLogMessage(options: BuildLogMessageOptions): LogMessage {
	return {
		_meta: {
			pid: process.pid,
			hostname: os.hostname(),
			v: 1,
		},
		name: options.name,
		level: options.level,
		time: Date.now(),
		msg: options.message,
		...options.obj,
	};
}
