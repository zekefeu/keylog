import { expect, it, describe } from "vitest";

import * as main from "../../src/main.ts";

describe("Testing the Logger class", () => {
	it("should export a Logger class", () => {
		expect(new main.Logger()).toBeInstanceOf(main.Logger);
	});
});
