import { ILogEventSink } from "../../src/core/ILogEventSink";
import { LogEvent } from "../../src/events/LogEvent";
import { StringTextBuffer } from "./StringTextBuffer";
import { ConsoleFormatter } from "../../src/sinks/console/ConsoleFormatter";

export class MockSink implements ILogEventSink {
	private _buffer: StringTextBuffer;
	private _textFormatter: ConsoleFormatter;

	public constructor(buffer: StringTextBuffer, textFormatter: ConsoleFormatter) {
		this._buffer = buffer;
		this._textFormatter = textFormatter;
	}

	public emit(logEvent: LogEvent): void {
		this._textFormatter.format(logEvent, this._buffer);
		this._buffer.flush();
	}
}
