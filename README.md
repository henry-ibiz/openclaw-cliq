# OpenClaw Cliq Channel

Zoho Cliq integration for [OpenClaw](https://github.com/openclaw/openclaw) — lets you @mention your AI agent in Cliq channels and DMs.

## How It Works

```
User @mentions "Henry" in Cliq
         ↓
Cliq Bot (mention/message handler)
         ↓
POST to OpenClaw Gateway webhook
         ↓
Agent processes and responds
         ↓
Cliq API POST
         ↓
Response appears in Cliq
```

## Quick Start

### 1. Create a Cliq Bot

1. Go to **Zoho Cliq Admin** → **Bots** → **Create Bot**
2. Name it (e.g., "Henry")
3. Copy the **Bot Unique Name** — you'll need it for config
4. Set up handlers (see [Setup Guide](docs/SETUP.md))

### 2. Configure OpenClaw

Add to your OpenClaw gateway config:

```yaml
channels:
  cliq:
    apiToken: "your-zoho-oauth-token"
    orgId: "your-zsoid"
    botUniqueName: "henry"
    webhookSecret: "optional-secret"
```

### 3. Set Webhook URL

Point your Cliq bot handlers to:
```
https://your-openclaw-gateway/cliq/webhook
```

See [docs/SETUP.md](docs/SETUP.md) for detailed instructions.

## Development

```bash
npm install
npm run build
```

## License

MIT
