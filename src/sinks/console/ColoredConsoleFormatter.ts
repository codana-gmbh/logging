import * as chalk from "chalk";
import { LogEvent } from "../../events";
import { ITextBuffer, ITextFormatter } from "../../formatting";
import { LogLevel } from "../../LogLevel";
import { ILogEventToken } from "../../rendering/ILogEventToken";
import { ITokenRenderer, LogEventTokenizer, LogLevelToken } from "../../rendering";
import { ChalkColoredTextBuffer } from "./ChalkColoredTextBuffer";

export class ColoredConsoleFormatter implements ITextFormatter {
  private _tokenizer: LogEventTokenizer;
  private _tokenRenderer: ITokenRenderer;

  public constructor(tokenizer: LogEventTokenizer, tokenRenderer: ITokenRenderer) {
    this._tokenizer = tokenizer;
    this._tokenRenderer = tokenRenderer;
  }

  public format(logEvent: LogEvent, buffer: ITextBuffer): void {
    const tokens = this._tokenizer.tokenize(logEvent);
    const logLevelToken = tokens.find((x) => this.isLogLevelToken(x)) as LogLevelToken;
    let logColor = this.getDefaultColor();
    if (logLevelToken != undefined) {
      logColor = this.getColorByLogLevel(logLevelToken.level);
    }
    const chalkColoredTextBuffer = new ChalkColoredTextBuffer(logColor);
    tokens.forEach((x) => {
      this._tokenRenderer.render(x, chalkColoredTextBuffer);
    });
    buffer.write(chalkColoredTextBuffer.value);
  }

  private isLogLevelToken(token: ILogEventToken): token is LogLevelToken {
    const t = token as LogLevelToken;
    return t != undefined && t.level != undefined;
  }

  private getDefaultColor(): chalk.Chalk {
    return chalk.dim;
  }

  private getColorByLogLevel(level: LogLevel) {
    switch (level) {
      case LogLevel.Error:
        return chalk.red;
      case LogLevel.Fatal:
        return chalk.bgRed;
      case LogLevel.Warn:
        return chalk.yellow;
      case LogLevel.Info:
        return chalk.cyan;
      case LogLevel.Debug:
      default:
        return chalk.dim;
    }
  }
}
