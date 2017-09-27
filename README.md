# econsor-mobile logging library [![Build Status](https://travis-ci.org/econsor-mobile/logging.svg?branch=master)](https://travis-ci.org/econsor-mobile/logging)
This package is the core library for logging with javascript used in projects of econsor-mobile.

This library is heavily inspired by [Serilog](https://github.com/serilog/serilog)

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