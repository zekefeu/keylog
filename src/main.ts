/**
 * main.ts
 * Implements and exports the Logger class
 */

import { LoggerOptions, Level } from "./types/global";

import { buildLogMessage } from "./utils/utils.js";

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
	 * Initializes the logger
	 * @param options
	 */
	constructor(options?: LoggerOptions) {
		if (options) {
			// Reassign entirely the config
			this.loggerOptions = options;

			// Merge objects
			// this.loggerOptions = Object.assign(this.loggerOptions, options);
		}
	}

	debug(message: string, obj?: object) {
		this.distributeLogMessage("debug", message, obj);
	}

	info(message: string, obj?: object) {
		this.distributeLogMessage("info", message, obj);
	}

	warn(message: string, obj?: object) {
		this.distributeLogMessage("warn", message, obj);
	}

	error(message: string, obj?: object) {
		this.distributeLogMessage("error", message, obj);
	}

	fatal(message: string, obj?: object) {
		this.distributeLogMessage("fatal", message, obj);
	}

	/**
	 * Loops through each stream and transport
	 * and send them the message
	 * @param message
	 */
	distributeLogMessage(level: Level, message: string, obj?: object) {
		// Build the message object
		const logMessage = buildLogMessage({
			name: this.loggerOptions.name,
			level: level,
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

// Exports
import GenericTransport from "./transports/GenericTransport.js";
import ConsoleTransport from "./transports/ConsoleTransport.js";
import FileTransport from "./transports/FileTransport.js";

export const transports = {
	GenericTransport: GenericTransport,
	ConsoleTransport: ConsoleTransport,
	FileTransport: FileTransport,
};