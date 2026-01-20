#!/usr/bin/env node
import { runPrompt } from "../src/core/prompt.js";
import { resolveConfig } from "../src/core/resolver.js";
import { planProject } from "../src/core/planner.js";
import { generateProject } from "../src/core/generator.js";

async function main() {
  console.log(`
╔═══════════════════════════════════════╗
║           🔥 ZYGOKIT 🔥              ║
║   Project Scaffolding Tool           ║
╚═══════════════════════════════════════╝
`);

  const config = await runPrompt();
  const resolved = resolveConfig(config);
  const plan = planProject(resolved);

  await generateProject(plan, config.projectName, resolved);
}

main().catch(error => {
  console.error("\n❌ Erro fatal:", error.message);
  process.exit(1);
});