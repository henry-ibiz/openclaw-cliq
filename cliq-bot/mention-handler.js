/**
 * Cliq Bot Mention Handler (Deluge)
 * 
 * This handles @mentions of the bot in channels.
 * Paste this into your Cliq bot's Mention Handler.
 * 
 * IMPORTANT: Replace OPENCLAW_WEBHOOK_URL with your actual endpoint.
 */

// Deluge code for Cliq Mention Handler:
/*
response = Map();

// Get message details
user_id = user.get("id");
user_name = user.get("name");
chat_id = chat.get("id");
chat_name = chat.get("name");
chat_type = chat.get("type");  // "channel", "chat", etc.
message_text = message.get("text");
message_id = message.get("id");

// Get mention details
mention_text = mention.get("text");  // e.g., "@Henry"
mention_offset = mention.get("offset");  // Position in message

// Prepare webhook payload
payload = Map();
payload.put("handler", "mentionhandler");

params = Map();
params.put("type", "mention");
params.put("user", {"id": user_id, "name": user_name});
params.put("chat", {"id": chat_id, "name": chat_name, "type": chat_type});
params.put("message", {"id": message_id, "text": message_text, "content_type": "text", "time": zoho.currenttime.toLong()});
params.put("mention", {"text": mention_text, "offset": mention_offset});

payload.put("params", params);

// Send to OpenClaw webhook  
webhook_url = "YOUR_OPENCLAW_WEBHOOK_URL/cliq/webhook";
webhook_response = invokeurl
[
    url: webhook_url
    type: POST
    parameters: payload.toString()
    headers: {"Content-Type": "application/json"}
];

// Optionally return a "thinking" indicator
response.put("text", "🤔");
return response;
*/
