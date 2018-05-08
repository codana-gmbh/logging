import { ILogEventSink } from "../core";
import { LogEvent } from "../events";

export class SafeAggregateSink implements ILogEventSink {
  private readonly _sinks: ILogEventSink[];

  public constructor(sinks: ILogEventSink[]) {
    this._sinks = sinks;
  }

  public emit(logEvent: LogEvent): void {
    this._sinks.forEach((x) => {
      try {
        x.emit(logEvent);
      } catch (error) {
        /* tslint:disable:no-console */
        if (console != undefined) {
          if (console.error != undefined) {
            console.error("An error occured while emitting log event to sink");
          } else if (console.log != undefined) {
            console.log("An error occured while emitting log event to sink");
          }
        }
        /* tslint:enable:no-console */
      }
    });
  }
}
