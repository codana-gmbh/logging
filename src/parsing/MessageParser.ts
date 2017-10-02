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

        const tokens: IMessageToken[] = [];
        let nextPosition = template.indexOf("{");
        while (nextPosition > -1) {
            const startIndex = nextPosition + 1;
            const endPosition = template.indexOf("}", startIndex);
            nextPosition = template.indexOf("{", endPosition);
            const name = template.substr(startIndex, endPosition - startIndex);
            tokens.push({
                name,
                position: tokens.length,
            });

        }
        return tokens;
    }
}
