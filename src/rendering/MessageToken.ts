import { ILogEventToken } from "./ILogEventToken";
import {Message} from "../parsing/Message";
import {ILogEventProperty} from "../events/ILogEventProperty";

export class MessageToken implements ILogEventToken {

    public readonly message: string;

    public constructor(message: Message, properties: ILogEventProperty[]) {
        let m = message.template;
        message.tokens.forEach((x) => {
            const tokenPlaceholder = `{${x.name}}`;
            const tokenValue = properties[x.position].value;
            m = m.replace(tokenPlaceholder, tokenValue);
        });
        this.message = m;
    }

}
