/**
 * Zoho Cliq Channel Plugin for OpenClaw
 * 
 * Handles incoming webhooks from Cliq and sends responses via Cliq API
 */

import {
  CliqChannelConfig,
  CliqWebhookPayload,
  CliqMentionPayload,
  CliqMessagePayload,
  CliqSendMessageRequest,
} from './types';

const DEFAULT_API_BASE = 'https://cliq.zoho.com';

export class CliqChannel {
  private config: CliqChannelConfig;
  private apiBase: string;

  constructor(config: CliqChannelConfig) {
    this.config = config;
    this.apiBase = config.apiBaseUrl || DEFAULT_API_BASE;
  }

  /**
   * Parse and validate incoming webhook from Cliq
   */
  parseWebhook(body: unknown): { 
    userId: string;
    userName: string;
    chatId: string;
    chatType: string;
    messageId: string;
    text: string;
    isMention: boolean;
  } | null {
    const payload = body as CliqWebhookPayload;
    
    if (!payload?.params) {
      console.error('[CliqChannel] Invalid webhook payload:', body);
      return null;
    }

    const params = payload.params;
    const isMention = payload.handler === 'mentionhandler';
    
    // Extract text - for mentions, strip the @Henry prefix
    let text = params.message.text;
    if (isMention && 'mention' in params) {
      const mention = (params as CliqMentionPayload).mention;
      // Remove the @mention from the text
      text = text.slice(0, mention.offset) + text.slice(mention.offset + mention.text.length);
      text = text.trim();
    }

    return {
      userId: params.user.id,
      userName: params.user.name,
      chatId: params.chat.id,
      chatType: params.chat.type,
      messageId: params.message.id,
      text,
      isMention,
    };
  }

  /**
   * Send a message to Cliq
   */
  async sendMessage(chatId: string, text: string): Promise<boolean> {
    const url = `${this.apiBase}/api/v2/channelsbyname/${this.config.botUniqueName}/message`;
    
    const body: CliqSendMessageRequest = {
      text,
      chat_id: chatId,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${this.config.apiToken}`,
          'Content-Type': 'application/json',
          'orgId': this.config.orgId,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[CliqChannel] API error:', response.status, errorText);
        return false;
      }

      return true;
    } catch (error) {
      console.error('[CliqChannel] Send failed:', error);
      return false;
    }
  }

  /**
   * Send a message to a channel by name
   */
  async sendToChannel(channelUniqueName: string, text: string): Promise<boolean> {
    const url = `${this.apiBase}/api/v2/channelsbyname/${channelUniqueName}/message`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${this.config.apiToken}`,
          'Content-Type': 'application/json',
          'orgId': this.config.orgId,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[CliqChannel] Channel send error:', response.status, errorText);
        return false;
      }

      return true;
    } catch (error) {
      console.error('[CliqChannel] Channel send failed:', error);
      return false;
    }
  }

  /**
   * Send a DM to a user
   */
  async sendDM(userId: string, text: string): Promise<boolean> {
    const url = `${this.apiBase}/api/v2/buddies/${userId}/message`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${this.config.apiToken}`,
          'Content-Type': 'application/json',
          'orgId': this.config.orgId,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[CliqChannel] DM send error:', response.status, errorText);
        return false;
      }

      return true;
    } catch (error) {
      console.error('[CliqChannel] DM send failed:', error);
      return false;
    }
  }
}

export default CliqChannel;
