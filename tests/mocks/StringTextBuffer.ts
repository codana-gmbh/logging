import { ITextBuffer } from "../../src/formatting/ITextBuffer";

export class StringTextBuffer implements ITextBuffer {

	public data: string | undefined;
	private bufferString: string | undefined;

	public write(value: string): void {
		if (this.bufferString == undefined) {
			this.bufferString = value;
			return;
		}
		this.bufferString += value;
	}

	public writeLine(): void {
		if (this.bufferString == undefined) {
			this.bufferString = "\n";
			return;
		}
		this.bufferString += "\n";
	}

	public flush(): void {
		if (this.data == undefined) {
			this.data = this.bufferString;
		}
		else {
			this.data += this.bufferString;
		}
		this.bufferString = undefined;
	}

}