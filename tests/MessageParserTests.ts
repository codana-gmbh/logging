import {MessageParser} from "../src/parsing/MessageParser";
import {Message} from "../src/parsing/Message";

describe("MessageParser", () => {

    describe("given invalid value", () => {
        it("undefined", () => {
            const parser = new MessageParser();
            expect(() => {
                const unwrap = parser as any;
                unwrap.parse(undefined);
            }).toThrowError();
        });
        it("null", () => {
            const parser = new MessageParser();
            expect(() => {
                const unwrap = parser as any;
                unwrap.parse(null);
            }).toThrowError();
        });
        it("empty", () => {
            const parser = new MessageParser();
            expect(() => {
                const unwrap = parser as any;
                unwrap.parse("");
            }).toThrowError();
        });
    });

    describe("given a message", () => {
        it("does not throw an error", () => {
            const parser = new MessageParser();
            expect(() => {
                parser.parse("Sample message of {messageType} with {messageId}");
            }).not.toThrowError();
        });

        it("returns not undefined", () => {
            const parser = new MessageParser();
            const message = parser.parse("Sample message of {messageType} with {messageId}");
            expect(message).not.toBeUndefined();
        });

        it("returns not null", () => {
            const parser = new MessageParser();
            const message = parser.parse("Sample message of {messageType} with {messageId}");
            expect(message).not.toBeNull();
        });

        it("returns a message", () => {
            const parser = new MessageParser();
            const message = parser.parse("Sample message of {messageType} with {messageId}");
            expect(message).toBeInstanceOf(Message);
        });

        describe("returned message", () => {

            describe("template property", () => {
                it("is not undefined", () => {
                    const messageTemplate = "Sample message of {messageType} with {messageId}";
                    const parser = new MessageParser();
                    const message = parser.parse(messageTemplate);
                    expect(message.template).not.toBeUndefined();
                });

                it("is not null", () => {
                    const messageTemplate = "Sample message of {messageType} with {messageId}";
                    const parser = new MessageParser();
                    const message = parser.parse(messageTemplate);
                    expect(message.template).not.toBeNull();
                });

                it("matches the passed message", () => {
                    const messageTemplate = "Sample message of {messageType} with {messageId}";
                    const parser = new MessageParser();
                    const message = parser.parse(messageTemplate);
                    expect(message.template).toEqual(messageTemplate);
                });
            });

            describe("tokens", () => {

                it("are not null", () => {
                    const messageTemplate = "Sample message of {messageType} with {messageId}";
                    const parser = new MessageParser();
                    const message = parser.parse(messageTemplate);
                    expect(message.tokens).not.toBeUndefined();
                });

                it("are not null", () => {
                    const messageTemplate = "Sample message of {messageType} with {messageId}";
                    const parser = new MessageParser();
                    const message = parser.parse(messageTemplate);
                    expect(message.tokens).not.toBeNull();
                });

                it("amount matches placeholder count", () => {
                    const messageTemplate = "Sample message of {messageType} with {messageId}";
                    const parser = new MessageParser();
                    const message = parser.parse(messageTemplate);
                    expect(message.tokens.length).toEqual(2);
                });

                it("matches placeholder", () => {
                    const messageTemplate = "Sample message of {messageType} with {messageId}";
                    const parser = new MessageParser();
                    const message = parser.parse(messageTemplate);
                    expect(message.tokens[0].name).toEqual("messageType");
                    expect(message.tokens[1].name).toEqual("messageId");
                });

                it("matches position", () => {
                    const messageTemplate = "Sample message of {messageType} with {messageId}";
                    const parser = new MessageParser();
                    const message = parser.parse(messageTemplate);
                    expect(message.tokens[0].position).toEqual(0);
                    expect(message.tokens[1].position).toEqual(1);
                });
            });
        });
    });
});