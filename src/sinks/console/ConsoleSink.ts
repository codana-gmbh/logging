import {ILogEventSink} from "../../core/ILogEventSink";
import {LogEvent} from "../../events/LogEvent";
import {ITextFormatter} from "../../formatting/ITextFormatter";
import {ConsoleFormatter} from "./ConsoleFormatter";
import {ConsoleTextBuffer} from "./ConsoleTextBuffer";

export class ConsoleSink implements ILogEventSink {
    private _textFormatter: ITextFormatter;

    public constructor(textFormatter: ConsoleFormatter) {
        this._textFormatter = textFormatter;
    }

    public emit(logEvent: LogEvent): void {
        const buffer = new ConsoleTextBuffer();
        this._textFormatter.format(logEvent, buffer);
        buffer.flush();
    }
}
