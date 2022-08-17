import { expect, it, describe } from "vitest";

import ConsoleTransport from "../../../src/transports/ConsoleTransport.ts";

describe("Testing the ConsoleTransport class", () => {
	it.skip("should throw if we choose a custom format but don't provide a format function", () => {
		expect(new ConsoleTransport({ level: "info", format: "custom" })).toThrow();
		//Error(new Error("Custom format function is required"));
	});
});
