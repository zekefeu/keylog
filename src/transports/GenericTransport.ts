/**
 * transports/GenericTransport.ts
 * This is the default class used to create any kind of transport.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { LogMessage, Transport, TransportOption } from "global";

class GenericTransport implements Transport {
	/**
	 * Called when the transport is initialized
	 * @param options
	 */
	constructor(options?: TransportOption) {}

	/**
	 * Called whenever we want to log a message
	 * @param message
	 */
	log(message: LogMessage) {}
}

module.exports = GenericTransport;
