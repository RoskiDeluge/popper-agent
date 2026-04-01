import { describe, expect, test } from "vitest";
import { PPPR_SYSTEM_PROMPT } from "../src/pppr/system-prompt.js";

describe("PPPR_SYSTEM_PROMPT", () => {
	test("describes the minimal default toolset", () => {
		expect(PPPR_SYSTEM_PROMPT).toContain("- read:");
		expect(PPPR_SYSTEM_PROMPT).toContain("- bash:");
		expect(PPPR_SYSTEM_PROMPT).toContain("- edit:");
		expect(PPPR_SYSTEM_PROMPT).toContain("- write:");
	});

	test("keeps the simplicity guidance explicit", () => {
		expect(PPPR_SYSTEM_PROMPT).toContain("Keep plans and durable state in files");
		expect(PPPR_SYSTEM_PROMPT).toContain("Be concise in your responses");
	});
});
