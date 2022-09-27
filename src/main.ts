/**
 * main.ts
 * Implements and exports the Logger class
 */

import { Level, LoggerOptions, Transport } from "global";

const { buildLogMessage } = require("./utils/utils.js");

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
	 * @param level
	 * @param message
	 * @param obj
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
			this.loggerOptions.transports.forEach((transport: Transport) => {
				transport.log(logMessage);
			});
		}
	}
}

// Exports
const GenericTransport = require("./transports/GenericTransport.js");
const ConsoleTransport = require("./transports/ConsoleTransport.js");
const FileTransport = require("./transports/FileTransport.js");

module.exports.transports = {
	GenericTransport: GenericTransport,
	ConsoleTransport: ConsoleTransport,
	FileTransport: FileTransport,
};
