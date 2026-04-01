#!/usr/bin/env node
process.title = "pppr";

import { setBedrockProviderModule } from "@mariozechner/pi-ai";
import * as bedrockProviderModule from "@mariozechner/pi-ai/bedrock-provider";
import { EnvHttpProxyAgent, setGlobalDispatcher } from "undici";
import { main } from "./pppr/main.js";

const resolvedBedrockProviderModule = bedrockProviderModule as unknown as {
	bedrockProviderModule: Parameters<typeof setBedrockProviderModule>[0];
};

setGlobalDispatcher(new EnvHttpProxyAgent());
setBedrockProviderModule(resolvedBedrockProviderModule.bedrockProviderModule);

main(process.argv.slice(2)).catch((error: unknown) => {
	const message = error instanceof Error ? error.message : String(error);
	process.stderr.write(`${message}\n`);
	process.exit(1);
});
