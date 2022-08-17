/**
 * transports/ConsoleTransports.ts
 * Exports a transport that logs messages to the standard output
 */

import fs from "node:fs";
import process from "node:process";

import { FileTransportOption, LogMessage } from "../types/global";

import levels from "../utils/levels.js";
import GenericTransport from "./GenericTransport.js";

export default class FileTransport extends GenericTransport {
	// The transport's minimum level
	readonly options: FileTransportOption;

	/**
	 * Called when the transport is initialized
	 * @param options
	 */
	constructor(options: FileTransportOption) {
		super();

		this.options = options;
	}

	/**
	 * Called whenever we want to log a message
	 * @param message
	 */
	log(message: LogMessage) {
		// Ignore if the message is below the transport's minimum level
		if (levels[this.options.level] > levels[message.level]) return;

		if (this.options.attachDiagnosticReport && process.report) {
			const report = process.report.getReport();
			message = Object.assign(message, { _meta: { diagReport: report } });
		}

		if (this.options.async) {
			setImmediate(() => {
				this.writeLine(message);
			});
		} else {
			this.writeLine(message);
		}
	}

	writeLine(message: LogMessage) {
		fs.appendFile(this.options.path, JSON.stringify(message) + "\n", (error) => {
			if (error) throw error;
		});
	}
}
