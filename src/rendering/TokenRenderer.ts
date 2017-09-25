import {LogLevel} from "../";
import {ITextBuffer} from "../formatting";
import {ILogEventToken} from "./ILogEventToken";
import {ITokenRenderer} from "./ITokenRenderer";
import {LogLevelToken} from "./LogLevelToken";
import {MessageToken} from "./MessageToken";
import {TimestampToken} from "./TimestampToken";

export class TokenRenderer implements ITokenRenderer {

    public render<TToken extends ILogEventToken>(token: TToken, buffer: ITextBuffer): void {
        if (this.isLogLevelToken(token)) {
            this.renderLevelToken(token, buffer);
        }
        else if (this.isMessageToken(token)) {
            this.renderMessageToken(token, buffer);
        }
        else if (this.isTimestampToken(token)) {
            this.renderTimestampToken(token, buffer);
        }
    }

    private renderLevelToken(token: LogLevelToken, buffer: ITextBuffer): void {
        let stringifiedLogLevel: string;
        switch (token.level) {
            case LogLevel.Debug:
                stringifiedLogLevel = "Debug";
                break;
            case LogLevel.Error:
                stringifiedLogLevel = "Error";
                break;
            case LogLevel.Fatal:
                stringifiedLogLevel = "Fatal";
                break;
            case LogLevel.Info:
                stringifiedLogLevel = "Info";
                break;
            case LogLevel.Warn:
                stringifiedLogLevel = "Warn";
                break;
            default:
                throw new Error("Passed unknown log level");
        }
        buffer.write(`[${stringifiedLogLevel}]`);
    }

    private renderTimestampToken(token: TimestampToken, buffer: ITextBuffer): void {
        buffer.write(`[${token.timestamp.toLocaleTimeString()}]`);
    }

    private renderMessageToken(token: MessageToken, buffer: ITextBuffer): void {
        buffer.write(`${token.message}`);
    }

    private isLogLevelToken(token: ILogEventToken): token is LogLevelToken {
        const t = token as LogLevelToken;
        return t != undefined && t.level != undefined;
    }

    private isMessageToken(token: ILogEventToken): token is MessageToken {
        const t = token as MessageToken;
        return t != undefined && t.message != undefined;
    }

    private isTimestampToken(token: ILogEventToken): token is TimestampToken {
        const t = token as TimestampToken;
        return t != undefined && t.timestamp != undefined;
    }
}
