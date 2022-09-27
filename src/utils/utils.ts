/**
 * utils/utils.ts
 * Contains frequently accessed functions
 */

import { BuildLogMessageOptions, Level, LogMessage } from "global";

const os = require("node:os");
const colors = require("./colors.js");

/**
 * Takes the level you want to get the color of
 * and returns the corresponding ANSI escape code
 */
function getLevelTheme(level: Level): string {
	switch (level) {
		case "debug":
			return colors.gray;
		case "info":
			return colors.blue;
		case "warn":
			return colors.yellow;
		case "error":
			return colors.red;
		case "fatal":
			return colors.red;
		default:
			return "";
	}
}

/**
 *
 * @param options
 * @returns
 */
function buildLogMessage(options: BuildLogMessageOptions): LogMessage {
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
		obj: options.obj ?? null,
	};
}

module.exports = {
	getLevelTheme,
	buildLogMessage,
};
