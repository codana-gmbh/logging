import {LogLevel} from "../LogLevel";
import {Message} from "../parsing/Message";
import {ILogEventProperty} from "./ILogEventProperty";

export class LogEvent {

    public get properties(): ILogEventProperty[] {
        return this._properties;
    }

    public readonly scope: string;
    public readonly timestamp: Date;
    public readonly level: LogLevel;
    public readonly message: Message;

    public readonly error: Error | undefined;
    private _properties: ILogEventProperty[];

    public constructor(scope: string,
                       timestamp: Date,
                       level: LogLevel,
                       error: Error | undefined,
                       message: Message,
                       properties: ILogEventProperty[]) {
        this._properties = [];
        this.scope = scope;
        this.timestamp = timestamp;
        this.level = level;
        this.error = error;
        this.message = message;
        if (properties != undefined) {
            properties.forEach((x) => {
                this.addOrUpdateProperty(x);
            });
        }
    }

    public addOrUpdateProperty(property: ILogEventProperty): void {
        if (property == undefined) {
            throw new Error("Parameter property must not be undefined");
        }
        this._properties = this._properties.filter((x) => x.name !== property.name);
        this._properties.push({name: property.name, value: property.value});
    }
}
