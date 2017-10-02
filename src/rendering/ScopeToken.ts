import { ILogEventToken } from "./ILogEventToken";

export class ScopeToken implements ILogEventToken {
    public readonly scope: string;

    public constructor(scope: string) {
        this.scope = scope;
    }
}
