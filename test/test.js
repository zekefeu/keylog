/**
 * This is a script used to test keylog's features
 */

const keylog = require("../src/main.js");

// Create a custom transport
class CustomTransport extends keylog.transports.GenericTransport {
	/**
	 * Called when the transport is initialized
	 * @param options
	 */
	constructor(options) {
		super(options);
	}

	/**
	 * Called whenever we want to log a message
	 * @param message
	 */
	log(message) {
		console.log(message);
	}
}

// Create the main logger
const logger = new keylog.Logger({
	name: "your-logger",
	transports: [
		new keylog.transports.ConsoleTransport({
			level: "info",
			format: "pretty",
		}),
		/*new keylog.transports.ConsoleTransport({
            level: "error", // "debug", "error", "fatal"
            format: "custom", // "custom", "json"
            customFormatFn: (message) => {
                return `${message.level}: ${message.msg}`
            }
        }),
        new CustomTransport(),*/
	],
	streams: [
		{
			level: "error",
			stream: process.stderr,
		},
	],
});

logger.info("Hello world !");

logger.error("Sound the alarm!", new Error("Test error"));

logger.info("My neighbours", [
	{ name: "John", likes: "dogs" },
	{ name: "Doug", likes: "cats" },
]);
