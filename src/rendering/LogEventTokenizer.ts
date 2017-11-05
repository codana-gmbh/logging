import { LogEvent } from "../events";
import { ILogEventToken } from "./ILogEventToken";
import { LogLevelToken } from "./LogLevelToken";
import { MessageToken } from "./MessageToken";
import { TimestampToken } from "./TimestampToken";
import {ScopeToken} from "./ScopeToken";
import { ErrorToken } from "./ErrorToken";

export class LogEventTokenizer {
    public tokenize(logEvent: LogEvent): ILogEventToken[] {
        const tokens: ILogEventToken[] = [
            new TimestampToken(logEvent.timestamp),
            new LogLevelToken(logEvent.level),
            new ScopeToken(logEvent.scope),
            new MessageToken(logEvent.message.template, logEvent.message.tokens, logEvent.properties),
        ];
        if (logEvent.error != undefined) {
            tokens.push(new ErrorToken(logEvent.error));
        }
        return tokens;
    }
}
