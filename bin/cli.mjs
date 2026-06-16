#!/usr/bin/env node
// namesniper-mcp: stdio bridge to the hosted NameSniper MCP server.
//
// The real server runs remotely at https://namesniper.pro/mcp (Streamable HTTP).
// This thin launcher lets stdio-only MCP clients (and `npx namesniper-mcp`)
// connect to it. The four checking tools work with no key; the generate,
// trademark, and watch tools need a NameSniper API key (Pro/Business plan).
//
// Optional auth: set NAMESNIPER_API_KEY=ns_sk_... or pass --key ns_sk_...

import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const ENDPOINT = 'https://namesniper.pro/mcp';

// Optional API key from env or a --key flag.
const argv = process.argv.slice(2);
const keyFlagIdx = argv.indexOf('--key');
const apiKey =
  process.env.NAMESNIPER_API_KEY ||
  (keyFlagIdx !== -1 ? argv[keyFlagIdx + 1] : undefined);

// Resolve mcp-remote's CLI entry directly, without relying on .bin shims, so
// this works the same under npm, pnpm, yarn, and `npx`.
const require = createRequire(import.meta.url);
const pkgJsonPath = require.resolve('mcp-remote/package.json');
const pkgJson = require('mcp-remote/package.json');
const binField = pkgJson.bin;
const binRel =
  typeof binField === 'string' ? binField : binField['mcp-remote'] ?? Object.values(binField)[0];
const mcpRemoteEntry = path.join(path.dirname(pkgJsonPath), binRel);

const args = [mcpRemoteEntry, ENDPOINT];
if (apiKey) {
  // Spawned with an args array (not a shell string), so the space in the header
  // value is preserved correctly.
  args.push('--header', `Authorization: Bearer ${apiKey}`);
}

const child = spawn(process.execPath, args, { stdio: 'inherit' });

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});

// Forward termination signals so the bridge shuts down cleanly.
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => child.kill(sig));
}
