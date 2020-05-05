import {LoggerConfiguration} from "../../src/LoggerConfiguration";
import {LogLevel} from "../../src/LogLevel";

describe("LoggerConfiguration", () => {
    describe("static create", () => {

        it("does not throw error", () => {
            expect(() => {
                LoggerConfiguration.create();
            }).not.toThrowError();
        });

        it("does not return undefined", () => {
            const config = LoggerConfiguration.create();
            expect(config).not.toBeUndefined();
        });

        it("does not return null", () => {
            const config = LoggerConfiguration.create();
            expect(config).not.toBeNull();
        });
    });

    describe("setLevel", () => {
        describe("given a LogLevel", () => {
            it("does not throw error", () => {
               const config = LoggerConfiguration.create();
               expect(() => {
                   config.setLogLevel(LogLevel.Debug);
               }).not.toThrowError();
            });

            it("changes log level", () => {
                const config = LoggerConfiguration.create();
                config.setLogLevel(LogLevel.Warn);
                const unwrapped = config as any;
                expect(unwrapped._level).toEqual(LogLevel.Warn);
            });
        });
    });
});
