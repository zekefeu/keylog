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
		const logMessage = buildLogMessage({
			name: this.loggerOptions.name,
			level: "info",
			message,
			obj,
		});

		this.distributeLogMessage(logMessage);
	}

	/**
	 * Loop through each stream and transport
	 * and send them the message
	 * @param message
	 */
	private distributeLogMessage(message: LogMessage) {
		// Streams

		// Transports
		if (this.loggerOptions.transports) {
			this.loggerOptions.transports.forEach((transport) => {
				transport.log(message);
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
	GenericTransport: GenericTransport
};
