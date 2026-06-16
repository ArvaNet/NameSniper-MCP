# NameSniper MCP Server

[![npm version](https://img.shields.io/npm/v/namesniper-mcp.svg)](https://www.npmjs.com/package/namesniper-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)](https://nodejs.org)
[![Model Context Protocol](https://img.shields.io/badge/MCP-server-blue.svg)](https://modelcontextprotocol.io)

NameSniper checks brand name, domain, and social handle availability across all the major social platforms, generates AI name ideas, and screens trademarks for conflicts. It also keeps watching taken usernames and alerts you the moment one frees up or drops, so you can claim a handle before anyone else. All from your AI client - Claude, Cursor, or any MCP host.

The server runs remotely at `https://namesniper.pro/mcp` (Streamable HTTP). Checking and alternatives are free and need no account; AI generation, trademark screening, and handle monitoring need a NameSniper API key (Pro or Business plan).

## Handle monitoring

Most availability checkers give a one-time yes or no. NameSniper keeps watching: put a taken handle on watch with `namesniper_watch` and get notified the instant it frees up across every platform we support, so you can register it first. Every plan includes watch slots (more on paid tiers); Instagram, TikTok, and X monitoring requires a paid plan.

## Connect

### Option A: remote URL (clients with native remote MCP support)

```json
{
  "mcpServers": {
    "namesniper": {
      "url": "https://namesniper.pro/mcp"
    }
  }
}
```

### Option B: npx bridge (works with any stdio MCP client)

```json
{
  "mcpServers": {
    "namesniper": {
      "command": "npx",
      "args": ["-y", "namesniper-mcp"]
    }
  }
}
```

With an API key for the paid tools (generate, trademark, watch):

```json
{
  "mcpServers": {
    "namesniper": {
      "command": "npx",
      "args": ["-y", "namesniper-mcp"],
      "env": { "NAMESNIPER_API_KEY": "ns_sk_your_key_here" }
    }
  }
}
```

You can also pass the key as a flag: `npx namesniper-mcp --key ns_sk_...`. Get a key at [namesniper.pro/dashboard](https://namesniper.pro/dashboard).

Config file locations:
- Claude Desktop: `claude_desktop_config.json`
- Cursor: `.cursor/mcp.json`

## Tools

| Tool | What it does | API key |
| --- | --- | --- |
| `namesniper_check` | Name across domains + social, with brand score (trademark screening when authenticated) | Free |
| `namesniper_check_domains` | Domain availability across TLDs | Free |
| `namesniper_check_social` | Username availability across platforms | Free |
| `namesniper_alternatives` | Brand name variations and creative patterns | Free |
| `namesniper_generate` | AI brand name generation from a description | Required |
| `namesniper_trademark` | USPTO trademark conflict screening | Required |
| `namesniper_watch` | Start monitoring a handle and get notified when it frees up | Required |
| `namesniper_watches` | List monitored handles and their status | Required |

Unauthenticated calls are rate limited. Provide an API key for higher limits and the paid tools.

## Resources

| Resource | URI |
| --- | --- |
| Pricing and per-call costs | `namesniper://pricing` |
| Supported platforms and TLDs | `namesniper://platforms` |

## Platforms

YouTube, Reddit, TikTok, Instagram, X (Twitter), GitHub, npm, Twitch, Threads, Bluesky, Pinterest, Snapchat, Kick, Substack, Linktree, Roblox.

## Links

- Website: https://namesniper.pro
- API docs: https://namesniper.pro/docs/api

## License

MIT
