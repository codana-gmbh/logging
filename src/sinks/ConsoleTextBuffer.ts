import {ITextBuffer} from "../formatting/ITextBuffer";

export class ConsoleTextBuffer implements ITextBuffer {
    private _value: string;

    public constructor() {
        this._value = "";
    }

    public write(value: string): void {
        this._value += value;
    }

    public writeLine(): void {
        this._value += "\n";
    }

    public flush(): void {
        /* tslint:disable:no-console */
        console.log(this._value);
        /* tslint:enable:no-console */
    }
}
