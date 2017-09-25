import { ITextBuffer } from "../formatting";
import { ILogEventToken } from "./ILogEventToken";

export interface ITokenRenderer {
    render<TToken extends ILogEventToken>(token: TToken, buffer: ITextBuffer): void;
}
