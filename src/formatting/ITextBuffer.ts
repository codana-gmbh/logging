export interface ITextBuffer {
    write(value: string): void;
    writeLine(): void;
    flush(): void;
}
