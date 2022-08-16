import * as stream from "node:stream";

declare global {
	// Types for the main logger object
	export interface LoggerOptions {
		name: string;

		// Can be used to mix properties in the message objects
		mixin?: any;
		mixinFunction?: Function;

		// Stream & transport options
		streams?: StreamOption[];
		transports?: TransportOption[];
	}

	export interface StreamOption {
		level: string;
		stream: stream.Writable;
	}

	export interface TransportOption {
		level: string;
	}
}
