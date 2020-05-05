# @econsor-mobile/logging ![CI](https://github.com/econsor-mobile/logging/workflows/CI/badge.svg) ![publish](https://github.com/econsor-mobile/logging/workflows/publish/badge.svg)
This package is the core library for logging with javascript used in projects of econsor-mobile.

This library is heavily inspired by [Serilog](https://github.com/serilog/serilog)

## Installation
Installation of the package with yarn
```
yarn add @econsor-mobile/logging
```
Installation of the package with npm
```
npm install --save @econsor-mobile/logging
```
## Example
```javascript
const logging = require('@econsor-mobile/logging');
const logger = logging
    .LoggerConfiguration
    .create()
    .setLogLevel(logging.LogLevel.Error)
    .addSink(logging.ConsoleSink.create())
    .createLogger();

logger.debug("Test debug");
logger.info("Test info");
logger.warn("Test warn");
logger.error("Test error");
logger.fatal("Test fatal");
```
