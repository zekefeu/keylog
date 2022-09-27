# Disclaimer

This documentation might be unclear/incomplete. I'm working on it, but it should be enough.

The library is simple enough to take a look at the code and see precisely how things works.

# Create a logger

Create a logger using the Logger class

Basic:

```typescript
const keylog = require("@fuka-g/keylog");

const logger = new keylog.Logger({
	name: "your-logger-name",
	transports: [
		new keylog.transports.ConsoleTransport({
			level: "info",
			format: "pretty",
			async: false,
		}),
	],
});

logger.info("Hello world !");
```

This sets up a basic logger with default settings.

The options object is optional, if it's not provided, it will stream all output to `stdout`.

Options:

- `name` (required): The name of your app

- `transports` (optional): An array of `transports`

- `streams` (optional): [experimental] An array of `streams`

# Using the logger

```typescript
logger.info(message, obj);
```

- message: The string we want to log

- obj (optional) An object we want to pass with the message

# Transports

Transports are classes used to handle logs and route them wherever we want.

## Built-in transports

### ConsoleTransport

Formats log and outputs them to stdout.

```typescript
new keylog.transports.ConsoleTransport({
	level: "info", // "debug", "error", "fatal"
	format: "pretty", // "custom", "json"
});
```

#### Custom formats

You can make your own format by providing a function that takes in a `LogMessage` object returns a string.
This string will be then printed.

```typescript
new keylog.transports.ConsoleTransport({
	level: "info", // "debug", "error", "fatal"
	format: "custom", // "custom", "json"
	customFormatFn: (message: LogMessage) => {
		return `${message.level}: ${message.msg}`;
	},
});
```

### FileTransport

Writes logs to a file

TODO

### GenericTransport

The class used to create custom transports, see `Creating your own transport`.

## Creating your own transport

Create a custom class extending the `keylog.transports.GenericTransport` class.
