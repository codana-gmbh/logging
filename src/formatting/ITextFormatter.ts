import {LogEvent} from "../events/LogEvent";
import {ITextBuffer} from "./ITextBuffer";

export interface ITextFormatter {
    format(logEvent: LogEvent, buffer: ITextBuffer): void;
}
