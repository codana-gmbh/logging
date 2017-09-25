import {LogEvent} from "../events/LogEvent";

export interface ILogEventSink {
    emit(logEvent: LogEvent): void;
}
