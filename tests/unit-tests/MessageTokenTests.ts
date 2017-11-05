import { IMessageToken } from "../../src/parsing/IMessageToken";
import { ILogEventProperty } from "../../src/events/ILogEventProperty";
import { MessageToken } from "../../src/rendering/MessageToken";

describe("MessageToken", () => {
	describe("constructor", () => {
		describe("with tokens and log event properties", () => {
			it("should match the expected string", () => {

				const messageTokens: IMessageToken[] = [
					{ name: "name", position: 0 },
					{ name: "fragment", position: 1 },
					{ name: "times", position: 2 },
				];

				const properties: ILogEventProperty[] = [
					{ name: "name", value: "Karl" },
					{ name: "fragment", value: "love" },
					{ name: "times", value: 10 },
				];

				const template = "Say hello {name}! It comes with {fragment} and count's {times}x.";
				const token = new MessageToken(template, messageTokens, properties);
				expect(token.message).toEqual("Say hello Karl! It comes with love and count's 10x.");
			});
		});
	});
});