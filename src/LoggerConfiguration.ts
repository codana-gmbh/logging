import { ILogEventSink } from "./core/ILogEventSink";
import { Logger } from "./core/Logger";
import { ILogger } from "./ILogger";
import { LogLevel } from "./LogLevel";
import { SafeAggregateSink } from "./sinks/SafeAggregateSink";
import { MessageParser } from "./parsing/MessageParser";
import { LogEventPropertyFactory } from "./events/LogEventPropertyFactory";

export class LoggerConfiguration {

    public static create(): LoggerConfiguration {
        return new LoggerConfiguration();
    }

    private _level: LogLevel;
    private readonly _sinks: ILogEventSink[];

    public constructor() {
        this._level = LogLevel.Info;
        this._sinks = [];
    }

    public setLogLevel(level: LogLevel): LoggerConfiguration {
        this._level = level;
        return this;
    }

    public addSink(sink: ILogEventSink): LoggerConfiguration {
        this._sinks.push(sink);
        return this;
    }

    public createLogger(scope: string): ILogger {
        const safeAggregateSink = new SafeAggregateSink(this._sinks);
        return new Logger(scope, this._level, safeAggregateSink, new MessageParser(), new LogEventPropertyFactory());
    }
}
