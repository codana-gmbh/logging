import {LogEvent} from "../../events/LogEvent";
import {ITextBuffer} from "../../formatting/ITextBuffer";
import {ITextFormatter} from "../../formatting/ITextFormatter";
import {ITokenRenderer} from "../../rendering/ITokenRenderer";
import {LogEventTokenizer} from "../../rendering/LogEventTokenizer";

export class ConsoleFormatter implements ITextFormatter {
    private _tokenizer: LogEventTokenizer;
    private _tokenRenderer: ITokenRenderer;

    public constructor(tokenizer: LogEventTokenizer, tokenRenderer: ITokenRenderer) {
        this._tokenizer = tokenizer;
        this._tokenRenderer = tokenRenderer;
    }

    public format(logEvent: LogEvent, buffer: ITextBuffer): void {
        const tokens = this._tokenizer.tokenize(logEvent);
        tokens.forEach((x) => this._tokenRenderer.render(x, buffer));
    }
}
