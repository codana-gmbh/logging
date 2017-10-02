import {IMessageToken} from "./IMessageToken";

export class Message {
    public readonly template: string;
    public readonly tokens: IMessageToken[];

    public constructor(template: string, tokens: IMessageToken[]) {
        this.template = template;
        this.tokens = tokens;
    }
}
