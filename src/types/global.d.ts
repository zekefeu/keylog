/**
 * types/global.d.ts
 * Types definitions for the project
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

declare module "global" {
	import stream from "node:stream";
	//import GenericTransport from "../transports/GenericTransport.js";

	type Level = "debug" | "info" | "warn" | "error" | "fatal";

	// Types for the Logger class
	interface LoggerOptions {
		name: string;

		// Can be used to mix properties in the message objects
		mixin?: object;
		mixinFn?: () => object;

		// Stream & transport options
		streams?: StreamOption[];
		transports?: Transport[];
	}

	interface StreamOption {
		level: Level;
		stream: stream.Writable;
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface TransportOption {}

	type ConsoleTransportFormat = "json" | "pretty" | "custom";

	interface ConsoleTransportOption extends TransportOption {
		level: Level;
		format: ConsoleTransportFormat;
		customFormatFn?: (message: LogMessage) => string;
		async: boolean;
	}

	interface FileTransportOption extends TransportOption {
		level: Level;
		path: string;
		async: boolean;
		attachDiagnosticReport: boolean;
	}

	interface LogMessage {
		_meta: {
			pid: number;
			hostname: string;
			diagnosticReport?: object;
			v: number;
			src?: {
				file: string;
				line: number;
				func: string;
			};
		};
		name: string;
		level: Level;
		time: number;
		msg: string;
	}

	class Transport {
		constructor(options: TransportOption);

		log(message: LogMessage): void;
	}

	interface BuildLogMessageOptions {
		name: string;
		level: Level;
		message: string;
		obj?: object;
	}

	class Logger {
		loggerOptions: LoggerOptions;

		constructor(options?: LoggerOptions);

		debug(message: string, obj?: object): void;
		info(message: string, obj?: object): void;
		warn(message: string, obj?: object): void;
		error(message: string, obj?: object): void;
		fatal(message: string, obj?: object): void;

		distributeLogMessage(message: string, obj?: object): void;
	}

	class GenericTransport {
		constructor(options: TransportOption);
		log(message: LogMessage): void;
		buildPrettyMessage(message: LogMessage): string;
	}

	class ConsoleTransport extends GenericTransport {
		constructor(options: TransportOption);
		log(message: LogMessage): void;
		buildPrettyMessage(message: LogMessage): string;
	}

	class FileTransport extends GenericTransport {
		constructor(options: TransportOption);
		log(message: LogMessage): void;
		writeLine(message: LogMessage): void;
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const transports = {
		GenericTransport,
		ConsoleTransport,
		FileTransport,
	};
}
