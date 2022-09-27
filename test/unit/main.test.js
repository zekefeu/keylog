import {
	expect,
	it,
	describe,
	vi,
	beforeAll,
	afterEach,
	afterAll,
} from "vitest";
import os from "os";

import * as keylog from "../../src/main.ts";

describe("Testing the Logger class", () => {
	beforeAll(() => {
		vi.useFakeTimers();
		vi.setSystemTime(0);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it("should export a Logger class", () => {
		expect(new keylog.Logger()).toBeInstanceOf(keylog.Logger);
		console.log(keylog);
	});

	/**
	 * Creates a logger, and logs "Hi from keylog !" using the ConsoleTransport transport
	 * Spies on console.log() to check the logger's output
	 */
	it.skip.concurrent(
		"should be able to log simple messages with ConsoleTransport",
		() => {
			const consoleLog = vi.spyOn(console, "log");

			const logger = new keylog.Logger({
				name: "keylog",
				transports: [
					new keylog.transports.ConsoleTransport({
						level: "info",
						format: "pretty",
						async: false,
					}),
				],
			});
			logger.info("Hi from keylog !");

			expect(consoleLog).toHaveBeenCalledTimes(1);
			expect(consoleLog).toHaveBeenCalledWith(
				`[1970-01-01T00:00:00.000Z] [keylog@${os.hostname()}] \x1b[94minfo\x1b[0m: Hi from keylog !`
			);
		}
	);
});
