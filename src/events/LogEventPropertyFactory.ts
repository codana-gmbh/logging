import { ILogEventProperty } from "./ILogEventProperty";
import { IMessageToken } from "../parsing/IMessageToken";

export class LogEventPropertyFactory {

	public createProperties(tokens: IMessageToken[], args: any[]): ILogEventProperty[] {
		const properties: ILogEventProperty[] = tokens.map((x) => {
			const property: ILogEventProperty = {
				name: x.name,
				value: x.position <= args.length - 1 ? args[x.position] : undefined,
			};
			return property;
		});
		return properties;
	}

}
