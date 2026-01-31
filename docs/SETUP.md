# Zoho Cliq + OpenClaw Setup Guide

Complete guide to connecting your OpenClaw agent to Zoho Cliq.

## Prerequisites

- Zoho Cliq admin access
- OpenClaw gateway running with public URL (or tunnel)
- Zoho OAuth credentials or API token

---

## Part 1: Create the Cliq Bot

### Step 1: Access Bot Builder

1. Open Zoho Cliq
2. Click the **gear icon** → **Admin Panel**
3. Go to **Bots & Tools** → **Bots**
4. Click **Create Bot**

### Step 2: Bot Configuration

- **Name**: Henry (or your agent's name)
- **Description**: AI assistant powered by OpenClaw
- **Bot Unique Name**: `henry` (lowercase, no spaces — this is used in API calls)
- **Access Level**: Organization (or as needed)

### Step 3: Add Handlers

#### Message Handler (for DMs)

1. Click **Add Handler** → **Message Handler**
2. Paste the Deluge code from `cliq-bot/message-handler.js`
3. Replace `YOUR_OPENCLAW_WEBHOOK_URL` with your gateway URL
4. Save

#### Mention Handler (for @mentions in channels)

1. Click **Add Handler** → **Mention Handler**  
2. Paste the Deluge code from `cliq-bot/mention-handler.js`
3. Replace `YOUR_OPENCLAW_WEBHOOK_URL` with your gateway URL
4. Save

### Step 4: Publish the Bot

1. Click **Publish**
2. Add the bot to channels where you want @mentions to work

---

## Part 2: Zoho OAuth Setup

### Option A: OAuth Token (Recommended)

1. Go to [Zoho API Console](https://api-console.zoho.com/)
2. Create a **Self Client**
3. Generate token with scopes:
   - `ZohoCliq.Webhooks.CREATE`
   - `ZohoCliq.Channels.ALL`
   - `ZohoCliq.Buddies.ALL`
4. Copy the access token

### Option B: Refresh Token (Production)

For production, set up OAuth refresh flow to auto-renew tokens.

---

## Part 3: OpenClaw Configuration

### Get Your Org ID (ZSOID)

1. In Cliq, click your profile icon
2. Go to **Settings** → **About**
3. Copy the **Organization ID (ZSOID)**

### Add to Gateway Config

```yaml
# In your openclaw.yaml or gateway config
channels:
  cliq:
    apiToken: "1000.xxxxx.xxxxx"  # OAuth token
    orgId: "123456789"            # Your ZSOID
    botUniqueName: "henry"        # Must match bot config
    webhookSecret: "optional"     # For request validation
```

### Expose Webhook

Your gateway needs a public URL. Options:
- **ngrok**: `ngrok http 3000`
- **Cloudflare Tunnel**: `cloudflared tunnel`
- **Production**: Deploy to Railway, Fly.io, etc.

Webhook endpoint will be at:
```
https://your-gateway-url/cliq/webhook
```

---

## Part 4: Testing

### Test DM

1. Open a DM with your bot in Cliq
2. Send: "Hello!"
3. You should see a response from your OpenClaw agent

### Test @Mention

1. Go to a channel where the bot is added
2. Type: "@Henry what's the weather?"
3. Bot should respond in the channel

---

## Troubleshooting

### Bot Not Responding

1. Check OpenClaw gateway logs for incoming webhooks
2. Verify webhook URL in Cliq handler code
3. Ensure OAuth token is valid and has correct scopes

### "Unauthorized" Errors

1. Regenerate OAuth token
2. Verify orgId is correct
3. Check token scopes include Cliq permissions

### Responses Not Appearing

1. Check Cliq API rate limits
2. Verify bot has permission to post in channel
3. Check OpenClaw logs for send errors

---

## API Reference

### Send Message to Channel

```bash
curl -X POST "https://cliq.zoho.com/api/v2/channelsbyname/{channel_name}/message" \
  -H "Authorization: Zoho-oauthtoken {token}" \
  -H "Content-Type: application/json" \
  -H "orgId: {zsoid}" \
  -d '{"text": "Hello from Henry!"}'
```

### Send DM

```bash
curl -X POST "https://cliq.zoho.com/api/v2/buddies/{user_id}/message" \
  -H "Authorization: Zoho-oauthtoken {token}" \
  -H "Content-Type: application/json" \
  -H "orgId: {zsoid}" \
  -d '{"text": "Hello!"}'
```

---

## Next Steps

- Set up token refresh for production
- Configure session mapping for multi-channel support
- Add rich message formatting (cards, buttons)
