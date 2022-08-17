/**
 * main.ts
 * Implements and exports the Logger class
 */

import os from "node:os";

import {
	BuildLogMessageOptions,
	LoggerOptions,
	LogMessage,
} from "./types/global";

export class Logger {
	// Default config
	loggerOptions: LoggerOptions = {
		name: "app",
		streams: [
			{
				level: "info",
				stream: process.stdout,
			},
		],
	};

	/**
	 *
	 * @param options
	 */
	constructor(options?: LoggerOptions) {
		if (options) {
			// Reassign entirely the config
			this.loggerOptions = options;

			// Merge objects
			// this.loggerOptions = Object.assign(this.loggerOptions, options);
		}

		// console.log(this.loggerOptions);
	}

	info(message: string, obj?: object) {
		this.distributeLogMessage(message, obj);
	}

	/**
	 * Loops through each stream and transport
	 * and send them the message
	 * @param message
	 */
	private distributeLogMessage(message: string, obj?: object) {
		// Build the message object
		const logMessage = buildLogMessage({
			name: this.loggerOptions.name,
			level: "info",
			message,
			obj,
		});

		// Streams

		// Transports
		if (this.loggerOptions.transports) {
			this.loggerOptions.transports.forEach((transport) => {
				transport.log(logMessage);
			});
		}
	}
}

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

// Exports
import ConsoleTransport from "./transports/ConsoleTransport.js";
import GenericTransport from "./transports/GenericTransport.js";

export const transports = {
	ConsoleTransport: ConsoleTransport,
	GenericTransport: GenericTransport,
};

import colors from "./utils/colors.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function formatFn(message: LogMessage): string {
	return `${colors.green}This is a ${colors.yellow}custom${
		colors.green
	} format for ConsoleTransport!${colors.blue} ${JSON.stringify(message)}${
		colors.reset
	}`;
}

const logger = new Logger({
	name: "keylog",
	transports: [
		new ConsoleTransport({ level: "info", format: "pretty", async: true }),
	],
});

logger.info("Hi from keylog !");
