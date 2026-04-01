import { homedir } from "node:os";
import { join } from "node:path";

export const PPPR_APP_NAME = "pppr";
export const PPPR_CONFIG_DIR_NAME = ".pppr";
export const PPPR_ENV_AGENT_DIR = "PPPR_CODING_AGENT_DIR";

export function getPpprAgentDir(): string {
	const envDir = process.env[PPPR_ENV_AGENT_DIR];
	if (envDir) {
		if (envDir === "~") return homedir();
		if (envDir.startsWith("~/")) return homedir() + envDir.slice(1);
		return envDir;
	}
	return join(homedir(), PPPR_CONFIG_DIR_NAME, "agent");
}
