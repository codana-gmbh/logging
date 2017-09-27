import {LogLevel} from "../LogLevel";
import {ILogEventProperty} from "./ILogEventProperty";

export class LogEvent {

    public get properties(): Readonly<ILogEventProperty[]> {
        return this._properties;
    }

    public readonly timestamp: Date;
    public readonly level: LogLevel;
    public readonly message: string;
    public readonly error: Error | undefined;

    private _properties: ILogEventProperty[];

    public constructor(timestamp: Date,
                       level: LogLevel,
                       error: Error | undefined,
                       message: string,
                       properties: ILogEventProperty[]) {
        this.timestamp = timestamp;
        this.level = level;
        this.error = error;
        this.message = message;
        if (properties != undefined && properties.length > 0) {
            properties.forEach((x) => {
                this.addOrUpdateProperty(x);
            });
        }
    }

    public addOrUpdateProperty(property: ILogEventProperty): void {
        if (property == undefined) {
            throw new Error("Parameter property must not be undefined");
        }
        if (this._properties == undefined) {
            this._properties = [];
        }
        this._properties = this._properties.filter((x) => x.name !== property.name);
        this._properties.push({name: property.name, value: property.value});
    }

    public addPropertyIfAbsent(property: ILogEventProperty): void {
        if (property == undefined) {
            throw new Error("Parameter property must not be undefined");
        }
        if (!this._properties.some((x) => x.name === property.name)) {
            this._properties.push({name: property.name, value: property.value});
        }
    }

    public removePropertyIfPresent(propertyName: string): void {
        this._properties = this._properties.filter((x) => x.name !== propertyName);
    }
}
