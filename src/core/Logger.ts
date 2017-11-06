import { LogEvent } from "../events/LogEvent";
import { ILogger } from "../ILogger";
import { LogLevel } from "../LogLevel";
import { ILogEventSink } from "./ILogEventSink";
import { MessageParser } from "../parsing/MessageParser";
import { ILogEventProperty } from "../events/ILogEventProperty";
import { IMessageToken } from "../parsing/IMessageToken";
import { LogEventPropertyFactory } from "../events/LogEventPropertyFactory";

export class Logger implements ILogger {
	private _scope: string;
	private _level: LogLevel;
	private _sink: ILogEventSink;
	private _messageParser: MessageParser;
	private _logEventPropertyFactory: LogEventPropertyFactory;

	public constructor(scope: string,
					               level: LogLevel,
					               sink: ILogEventSink,
					               messageParser: MessageParser,
					               logEventPropertyFactory: LogEventPropertyFactory) {
		this._scope = scope;
		this._level = level;
		this._sink = sink;
		this._messageParser = messageParser;
		this._logEventPropertyFactory = logEventPropertyFactory;
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
		this.internalWrite(LogLevel.Debug, message, rest, undefined);
	}

	public info(message: string, ...rest: any[]): void {
		this.internalWrite(LogLevel.Info, message, rest, undefined);
	}

	public warn(message: string, ...rest: any[]): void {
		this.internalWrite(LogLevel.Warn, message, rest, undefined);
	}

	public error(message: string, error: Error | null, ...rest: any[]): void {
		this.internalWrite(LogLevel.Error, message, rest, error);
	}

	public fatal(message: string, error: Error | null, ...rest: any[]): void {
		this.internalWrite(LogLevel.Fatal, message, rest, error);
	}

	private internalWrite(level: LogLevel, message: string, args: any[], error: Error | null | undefined): void {
		const messageTemplate = this._messageParser.parse(message);
		const properties = this._logEventPropertyFactory.createProperties(messageTemplate.tokens, args);
		const logEvent = new LogEvent(this._scope, new Date(), level, error === null ? undefined : error, messageTemplate, properties);
		this.write(logEvent);
	}
}
