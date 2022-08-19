/**
 * transports/ConsoleTransport.ts
 * Exports a transport that logs messages to the standard output
 */

import { ConsoleTransportOption, LogMessage } from "../types/global";

import colors from "../utils/colors.js";
import levels from "../utils/levels.js";
import { getLevelTheme } from "../utils/utils.js";
import GenericTransport from "./GenericTransport.js";

export default class ConsoleTransport extends GenericTransport {
	// The transport's minimum level
	readonly options: ConsoleTransportOption;

	/**
	 * Called when the transport is initialized
	 * @param options
	 */
	constructor(options: ConsoleTransportOption) {
		super();

		// Check that we have a customFormatFn if the format is set to custom
		if (options.format === "custom" && !options.customFormatFn)
			throw new Error("Custom format function is required");

		this.options = options;
	}

	/**
	 * Called whenever we want to log a message
	 * @param message
	 */
	log(message: LogMessage) {
		// Ignore if the message is below the transport's minimum level
		if (levels[this.options.level] > levels[message.level]) return;

		let line = "";

		if (this.options.format === "custom" && this.options.customFormatFn) {
			// Custom format, use the provided function
			line = this.options.customFormatFn(message);
		} else if (this.options.format === "json") {
			// Convert the object into a loggable string
			line = JSON.stringify(message);
		} else {
			// Use the built-in formatting function
			line = this.buildPrettyMessage(message);
		}

		console.log(line);
	}

	/**
	 * Builds a string
	 * @param message
	 * @returns The built string
	 */
	buildPrettyMessage(message: LogMessage): string {
		// Format the date
		const date = new Date();
		date.setTime(message.time);

		// Get the correct color for the specified level
		const levelColor = getLevelTheme(message.level);

		// Build the line that will be logged
		return `[${date.toISOString()}] [${message.name}@${
			message._meta.hostname
		}] ${levelColor}${message.level}${colors.reset}: ${message.msg}`;
	}
}
