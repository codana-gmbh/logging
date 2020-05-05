export class LogEventPropertyValueFormatter {
  public format<TValue>(value: TValue): string {
    if (value == undefined) {
      return "undefined";
    }
    if(typeof value === "string") {
      return value;
    }
    if(typeof value === "object") {
      return JSON.stringify(value, null, 2);
    }

    const unknown = (value as unknown) as { toString?: () => string };
    if(unknown.toString == undefined) {
      return "unknown";
    }
    return unknown.toString();
  }
}
