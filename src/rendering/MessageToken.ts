import { ILogEventToken } from "./ILogEventToken";

export class MessageToken implements ILogEventToken {

    public readonly message: string;

    public constructor(message: string) {
        this.message = message;
    }

}
