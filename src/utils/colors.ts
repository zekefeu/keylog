/**
 * utils/colors.ts
 * Exports ANSI excape codes for formatting terminal output.
 * I use this instead of colors because it's faster and just as easy to use.
 */

export default {
	// Colors
	gray: "\x1b[90m",
	red: "\x1b[91m",
	green: "\x1b[92m",
	yellow: "\x1b[93m",
	blue: "\x1b[94m",
	magenta: "\x1b[95m",
	cyan: "\x1b[96m",
	white: "\x1b[97m",

	// Formatting
	bold: "\x1b[1m",
	italic: "\x1b[3m",
	underline: "\x1b[4m",
	strikethrough: "\x1b[1m",

	// Reset
	reset: "\x1b[0m",
};
