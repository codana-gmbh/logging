import { ILogEventToken } from "./ILogEventToken";

export class ErrorToken implements ILogEventToken {
	public readonly error: Error;

	public constructor(error: Error) {
		this.error = error;
	}
}
