import {ILogEventSink} from "../core/ILogEventSink";
import {LogEvent} from "../events/LogEvent";

export class SafeAggregateSink implements ILogEventSink {
    private readonly _sinks: ILogEventSink[];

    public constructor(sinks: ILogEventSink[]) {
        this._sinks = sinks;
    }

    public emit(logEvent: LogEvent): void {
        this._sinks.forEach((x) => {
            try {
                x.emit(logEvent);
            }
            catch (error) {
                /* tslint:disable:no-console */
                console.error("An error occured while emitting log event to sink", error);
                /* tslint:enable:no-console */
            }
        });
    }
}
