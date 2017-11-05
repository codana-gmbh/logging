import { LogEventPropertyFactory } from "../../src/events/LogEventPropertyFactory";

describe("LogEventPropertyFactory", () => {
	describe("createProperties", () => {

		describe("with tokens", () => {
			describe("with rest parameter for each token", () => {

				it("should return a property for each token", () => {
					const tokens = [
						{ name: "t1", position: 0 },
						{ name: "t2", position: 1 },
						{ name: "t3", position: 2 },
					];

					const factory = new LogEventPropertyFactory();
					const properties = factory.createProperties(tokens, ["token1String", 3.3, { name: "complex object", value: 2.3 }]);

					expect(properties.length).toEqual(3);
				});

				it("property values should match parameter values", () => {
					const tokens = [
						{ name: "t1", position: 0 },
						{ name: "t2", position: 1 },
						{ name: "t3", position: 2 },
					];

					const factory = new LogEventPropertyFactory();
					const properties = factory.createProperties(tokens, ["token1String", 3.3, { name: "complex object", value: 2.3 }]);

					expect(properties[0].value).toEqual("token1String");
					expect(properties[1].value).toEqual(3.3);
					expect(properties[2].value).toEqual({ name: "complex object", value: 2.3 });
				});

			});
		});
	});
});
