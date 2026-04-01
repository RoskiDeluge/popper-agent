import { describe, expect, test } from "vitest";
import { parsePpprArgs } from "../src/pppr/args.js";

describe("parsePpprArgs", () => {
	test("parses print and continue flags", () => {
		const result = parsePpprArgs(["-p", "--continue"]);
		expect(result.print).toBe(true);
		expect(result.continue).toBe(true);
	});

	test("parses model, provider, and thinking", () => {
		const result = parsePpprArgs(["--provider", "openai", "--model", "gpt-5.4", "--thinking", "high"]);
		expect(result.provider).toBe("openai");
		expect(result.model).toBe("gpt-5.4");
		expect(result.thinking).toBe("high");
	});

	test("parses file args and messages", () => {
		const result = parsePpprArgs(["@README.md", "summarize this"]);
		expect(result.fileArgs).toEqual(["README.md"]);
		expect(result.messages).toEqual(["summarize this"]);
	});

	test("parses explicit tools", () => {
		const result = parsePpprArgs(["--tools", "read,write"]);
		expect(result.tools).toEqual(["read", "write"]);
	});
});
