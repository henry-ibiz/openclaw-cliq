/**
 * Zoho Cliq webhook payload types
 */

export interface CliqUser {
  id: string;
  name: string;
  email?: string;
  zuid?: string;
}

export interface CliqChat {
  id: string;
  name?: string;
  type: 'chat' | 'channel' | 'bot';
}

export interface CliqMessage {
  id: string;
  text: string;
  content_type: 'text' | 'file' | 'image';
  time: number;
}

export interface CliqMentionPayload {
  type: 'mention';
  user: CliqUser;
  chat: CliqChat;
  message: CliqMessage;
  mention: {
    text: string;      // The @mention text
    offset: number;    // Position in message
  };
}

export interface CliqMessagePayload {
  type: 'message';
  user: CliqUser;
  chat: CliqChat;
  message: CliqMessage;
}

export interface CliqWebhookPayload {
  handler: 'messagehandler' | 'mentionhandler' | 'webhookhandler';
  params: CliqMentionPayload | CliqMessagePayload;
}

/**
 * Cliq API response types
 */

export interface CliqApiResponse {
  status: 'success' | 'failure';
  message?: string;
}

export interface CliqSendMessageRequest {
  text: string;
  chat_id?: string;
  channel_unique_name?: string;
  bot_unique_name?: string;
}

/**
 * OpenClaw channel plugin config
 */

export interface CliqChannelConfig {
  /** Zoho OAuth token or API key */
  apiToken: string;
  
  /** Zoho org ID (ZSOID) */
  orgId: string;
  
  /** Bot unique name in Cliq */
  botUniqueName: string;
  
  /** Webhook secret for validating incoming requests */
  webhookSecret?: string;
  
  /** Base URL for Cliq API (defaults to https://cliq.zoho.com) */
  apiBaseUrl?: string;
  
  /** Map Cliq chat IDs to OpenClaw session labels */
  sessionMapping?: Record<string, string>;
}
