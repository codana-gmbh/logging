import { ILogEventSink } from "../../core";
import { LogEvent } from "../../events";
import { ITextFormatter } from "../../formatting";
import { LogEventTokenizer, TokenRenderer } from "../../rendering";
import { ColoredConsoleFormatter } from "./ColoredConsoleFormatter";
import { ConsoleTextBuffer } from "./ConsoleTextBuffer";

export class ConsoleSink implements ILogEventSink {
  public static create(): ConsoleSink {
    return new ConsoleSink(new ColoredConsoleFormatter(new LogEventTokenizer(), new TokenRenderer()));
  }

  private _textFormatter: ITextFormatter;

  public constructor(textFormatter: ITextFormatter) {
    this._textFormatter = textFormatter;
  }

  public emit(logEvent: LogEvent): void {
    const buffer = new ConsoleTextBuffer();
    this._textFormatter.format(logEvent, buffer);
    buffer.flush();
  }
}
