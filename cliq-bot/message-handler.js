/**
 * Cliq Bot Message Handler (Deluge)
 * 
 * This handles direct messages to the bot.
 * Paste this into your Cliq bot's Message Handler.
 * 
 * IMPORTANT: Replace OPENCLAW_WEBHOOK_URL with your actual endpoint.
 */

// Deluge code for Cliq Message Handler:
/*
response = Map();

// Get message details
user_id = user.get("id");
user_name = user.get("name");
chat_id = chat.get("id");
message_text = message.get("text");
message_id = message.get("id");

// Prepare webhook payload
payload = Map();
payload.put("handler", "messagehandler");

params = Map();
params.put("type", "message");
params.put("user", {"id": user_id, "name": user_name});
params.put("chat", {"id": chat_id, "type": "chat"});
params.put("message", {"id": message_id, "text": message_text, "content_type": "text", "time": zoho.currenttime.toLong()});

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
response.put("text", "🤔 Let me think about that...");
return response;
*/
