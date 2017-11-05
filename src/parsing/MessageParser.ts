import {IMessageToken} from "./IMessageToken";
import {Message} from "./Message";

export class MessageParser {

    public parse(message: string): Message {
        if (message == undefined || message === "") {
            throw new Error("Argument \"message\" must not be null, undefined or empty");
        }
        return new Message(message, this.tokenize(message));
    }

    private tokenize(template: string): IMessageToken[] {
		const regex = /\{(.*?)\}/g;
        const tokens: IMessageToken[] = [];
        let regexResult = regex.exec(template);
		while (regexResult !== null) {
			// This is necessary to avoid infinite loops with zero-width matches
			if (regexResult.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			tokens.push({
				name: regexResult[1],
				position: tokens.length,
			});
			regexResult = regex.exec(template);
		}
        return tokens;
    }
}
