import { Chalk } from "chalk";
import { ITextBuffer } from "../../formatting";

export class ChalkColoredTextBuffer implements ITextBuffer {
  private _value: string;
  private readonly _chalk: Chalk;

  public get value(): string {
    return this._chalk(this._value);
  }

  public constructor(chalk: Chalk) {
    this._value = "";
    this._chalk = chalk;
  }

  public write(value: string): void {
    this._value += value;
  }

  public writeLine(): void {
    this._value += "\n";
  }

  public flush(): void {
    return;
  }
}
