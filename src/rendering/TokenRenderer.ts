import {LogLevel} from "../";
import {ITextBuffer} from "../formatting";
import {ILogEventToken} from "./ILogEventToken";
import {ITokenRenderer} from "./ITokenRenderer";
import {LogLevelToken} from "./LogLevelToken";
import {MessageToken} from "./MessageToken";
import {TimestampToken} from "./TimestampToken";
import {ScopeToken} from "./ScopeToken";
import { ErrorToken } from "./ErrorToken";

export class TokenRenderer implements ITokenRenderer {

    public render<TToken extends ILogEventToken>(token: TToken, buffer: ITextBuffer): void {
        if (this.isScopeToken(token)) {
            this.renderScopeToken(token, buffer);
        }
        else if (this.isLogLevelToken(token)) {
            this.renderLevelToken(token, buffer);
        }
        else if (this.isMessageToken(token)) {
            this.renderMessageToken(token, buffer);
        }
        else if (this.isTimestampToken(token)) {
			this.renderTimestampToken(token, buffer);
		}
		else if (this.isErrorToken(token)) {
			this.renderErrorToken(token, buffer);
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

    private renderScopeToken(token: ScopeToken, buffer: ITextBuffer): void {
        buffer.write(`[${token.scope}]`);
    }

    private renderTimestampToken(token: TimestampToken, buffer: ITextBuffer): void {
        buffer.write(`[${token.timestamp.toLocaleTimeString()}]`);
    }

	private renderErrorToken(token: ErrorToken, buffer: ITextBuffer): void {
		buffer.writeLine();
		buffer.write(token.error.toString());
	}

    private renderMessageToken(token: MessageToken, buffer: ITextBuffer): void {
        buffer.write(token.message);
    }

    private isScopeToken(token: ILogEventToken): token is ScopeToken {
        const t = token as ScopeToken;
        return t != undefined && t.scope != undefined;
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

	private isErrorToken(token: ILogEventToken): token is ErrorToken {
		const t = token as ErrorToken;
		return t != undefined && t.error != undefined;
	}
}
