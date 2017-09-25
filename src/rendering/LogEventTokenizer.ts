import { LogEvent } from "../events";
import { ILogEventToken } from "./ILogEventToken";
import { LogLevelToken } from "./LogLevelToken";
import { MessageToken } from "./MessageToken";
import { TimestampToken } from "./TimestampToken";

export class LogEventTokenizer {
    public tokenize(logEvent: LogEvent): ILogEventToken[] {
        const tokens: ILogEventToken[] = [
            new TimestampToken(logEvent.timestamp),
            new LogLevelToken(logEvent.level),
            new MessageToken(logEvent.message),
        ];
        return tokens;
    }
}
