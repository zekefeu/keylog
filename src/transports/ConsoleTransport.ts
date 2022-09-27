/**
 * transports/ConsoleTransport.ts
 * Exports a transport that logs messages to the standard output
 */
import { ConsoleTransportOption, LogMessage } from "global";

const colors = require("../utils/colors.js");
const levels = require("../utils/levels.js");
const { getLevelTheme } = require("../utils/utils.js");
const GenericTransport = require("./GenericTransport.js");

class ConsoleTransport extends GenericTransport {
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

		let line: string;

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
		let line = `[${date.toISOString()}] [${message.name}@${
			message._meta.hostname
		}] ${levelColor}${message.level}${colors.reset}: ${message.msg}`;

		if (message.obj) {
			if (message.obj instanceof Error) {
				const error: Error = message.obj;

				// Add to the final string details about the error we threw
				// Like the message, the name if we set a custom name
				// The stack and a cause error, if specified
				line += `\n\r    ${colors.red}Error: ${colors.reset}${error.message}`;
				if (error.name && error.name !== "Error")
					line += `\n\r\t${colors.gray}Name: ${colors.reset}${error.name}`;
				line += `\n\r    Stack: ${colors.gray}${error.stack}${colors.reset}`;
				if (error.cause)
					line += `\n\r    ${colors.gray}Cause: ${colors.reset}${error.cause}`;
				line += "\n\r";
			} else {
				// Stringify the object and append it
				line += "\n\r";
				line += JSON.stringify(message.obj, null, "  ");
			}
		}

		return line;
	}
}

module.exports = ConsoleTransport;
