import { LogLevel } from "../";
import { ILogEventToken } from "./ILogEventToken";

export class LogLevelToken implements ILogEventToken {
    public readonly level: LogLevel;

    public constructor(level: LogLevel) {
        this.level = level;
    }
}
