import { ILogEventToken } from "./ILogEventToken";
import { ILogEventProperty } from "../events/ILogEventProperty";
import { IMessageToken } from "../parsing/IMessageToken";
import { LogEventPropertyValueFormatter } from "../formatting/LogEventPropertyValueFormatter";

export class MessageToken implements ILogEventToken {

	public readonly message: string;

	public constructor(template: string, tokens: IMessageToken[], properties: ILogEventProperty[]) {
		const valueFormatter = new LogEventPropertyValueFormatter();
		let message = template;
		tokens.forEach((x) => {
			const tokenPlaceholder = `{${x.name}}`;
			const tokenValue = valueFormatter.format(properties[x.position].value);
			message = message.replace(tokenPlaceholder, tokenValue);
		});
		this.message = message;
	}

}
