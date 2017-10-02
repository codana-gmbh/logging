import {LogEvent} from "../events/LogEvent";
import {ILogger} from "../ILogger";
import {LogLevel} from "../LogLevel";
import {ILogEventSink} from "./ILogEventSink";
import {MessageParser} from "../parsing/MessageParser";
import {ILogEventProperty} from "../events/ILogEventProperty";
import {IMessageToken} from "../parsing/IMessageToken";

export class Logger implements ILogger {
    private _scope: string;
    private _level: LogLevel;
    private _sink: ILogEventSink;
    private _messageParser: MessageParser;

    public constructor(scope: string, level: LogLevel, sink: ILogEventSink, messageParser: MessageParser) {
        this._scope = scope;
        this._level = level;
        this._sink = sink;
        this._messageParser = messageParser;
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
        const messageTemplate = this._messageParser.parse(message);
        const properties = this.internalMapProperties(messageTemplate.tokens, rest);
        const logEvent = new LogEvent(this._scope, new Date(), level, error, messageTemplate, properties);
        this.write(logEvent);
    }

    private internalMapProperties(tokens: IMessageToken[], ...rest: any[]): ILogEventProperty[] {
        const properties: ILogEventProperty[] = tokens.map((x) => {
            const property: ILogEventProperty = {
                name: x.name,
                value: x.position <= rest.length - 1 ? rest[x.position] : undefined,
            };
            return property;
        });
        return properties;
    }
}
