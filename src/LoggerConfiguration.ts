import {ILogEventSink} from "./core/ILogEventSink";
import {Logger} from "./core/Logger";
import {ILogger} from "./ILogger";
import {LogLevel} from "./LogLevel";
import {SafeAggregateSink} from "./sinks/SafeAggregateSink";

export class LoggerConfiguration {
    private _level: LogLevel;
    private _sinks: ILogEventSink[];

    public constructor() {
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

    public createLogger(): ILogger {
        const safeAggregateSink = new SafeAggregateSink(this._sinks);
        return new Logger(this._level, safeAggregateSink);
    }
}
