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

	info(message: string, obj: any) {
		console.log(message);
	}
}

// const logger = new Logger();

// logger.info("Hello", {});
