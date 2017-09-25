import {LogEvent} from "./events/LogEvent";
import {LogLevel} from "./LogLevel";

export interface ILogger {
    isEnabled(level: LogLevel): boolean;

    write(logEvent: LogEvent): void;

    debug(message: string, ...rest: any[]): void;

    info(message: string, ...rest: any[]): void;

    warn(message: string, ...rest: any[]): void;

    error(message: string, error: Error, ...rest: any[]): void;

    fatal(message: string, ...rest: any[]): void;
}
