/**
 * types/global.d.ts
 * Types definitons for the project
 */

import * as stream from "node:stream";

export type Level = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

// Types for the Logger class
export interface LoggerOptions {
	name: string;

	// Can be used to mix properties in the message objects
	mixin?: object;
	mixinFn?: () => object;

	// Stream & transport options
	streams?: StreamOption[];
	transports?: Transport[];
}

export interface StreamOption {
	level: Level;
	stream: stream.Writable;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TransportOption {}

export type ConsoleTransportFormat = "json" | "pretty" | "custom";

export interface ConsoleTransportOption extends TransportOption {
	level: Level;
	format: ConsoleTransportFormat;
	customFormatFn?: (message: LogMessage) => string;
	async: boolean;
}

export interface LogMessage {
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

export class Transport {
	constructor(options: TransportOption);

	log(message: LogMessage): void;
}

export interface BuildLogMessageOptions {
	name: string;
	level: Level;
	message: string;
	obj?: object;
}
