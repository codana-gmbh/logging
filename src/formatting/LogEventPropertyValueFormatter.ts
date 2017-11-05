export class LogEventPropertyValueFormatter {

	public format<TValue>(value: TValue): string {
		const valueType = typeof value;
		switch (valueType) {
			case "string":
				return value.toString();
			case "object":
				return JSON.stringify(value, null, 2);
			default:
				return value.toString();
		}
	}

}