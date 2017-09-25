import {LogEvent} from "../events/LogEvent";
import {ILogger} from "../ILogger";
import {LogLevel} from "../LogLevel";
import {ILogEventSink} from "./ILogEventSink";

export class Logger implements ILogger {
    private _level: LogLevel;
    private _sink: ILogEventSink;

    public constructor(level: LogLevel, sink: ILogEventSink) {
        this._level = level;
        this._sink = sink;
    }

    public isEnabled(level: LogLevel): boolean {
        return level <= this._level;
    }

    public write(logEvent: LogEvent): void {
        if (this.isEnabled(logEvent.level)) {
            this._sink.emit(logEvent);
        }
    }

    public debug(message: string, ...rest: any[]): void {
        this.internalWrite(LogLevel.Debug, message, undefined, rest);
    }

    public info(message: string, ...rest: any[]): void {
        this.internalWrite(LogLevel.Info, message, undefined, rest);
    }

    public warn(message: string, ...rest: any[]): void {
        this.internalWrite(LogLevel.Warn, message, undefined, rest);
    }

    public error(message: string, error: Error | undefined, ...rest: any[]): void {
        this.internalWrite(LogLevel.Error, message, error, rest);
    }

    public fatal(message: string, ...rest: any[]): void {
        this.internalWrite(LogLevel.Fatal, message, undefined, rest);
    }

    private internalWrite(level: LogLevel, message: string, error: Error | undefined, ...rest: any[]): void {
        const logEvent = new LogEvent(new Date(), level, error, message, rest);
        this.write(logEvent);
    }
}
