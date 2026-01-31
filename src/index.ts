/**
 * OpenClaw Cliq Channel Plugin
 * 
 * Provides Zoho Cliq integration for OpenClaw agents
 */

export { CliqChannel, default } from './cliq-channel';
export * from './types';

// Express webhook handler factory
import express, { Request, Response, Router } from 'express';
import { CliqChannel } from './cliq-channel';
import { CliqChannelConfig } from './types';

export interface WebhookHandlerOptions {
  config: CliqChannelConfig;
  onMessage: (params: {
    userId: string;
    userName: string;
    chatId: string;
    chatType: string;
    messageId: string;
    text: string;
    isMention: boolean;
    reply: (text: string) => Promise<boolean>;
  }) => Promise<void>;
}

/**
 * Create an Express router for handling Cliq webhooks
 */
export function createWebhookRouter(options: WebhookHandlerOptions): Router {
  const router = Router();
  const channel = new CliqChannel(options.config);

  router.use(express.json());

  router.post('/webhook', async (req: Request, res: Response) => {
    const parsed = channel.parseWebhook(req.body);
    
    if (!parsed) {
      res.status(400).json({ error: 'Invalid webhook payload' });
      return;
    }

    // Acknowledge immediately
    res.status(200).json({ status: 'received' });

    // Process async
    try {
      await options.onMessage({
        ...parsed,
        reply: (text: string) => {
          if (parsed.chatType === 'chat') {
            return channel.sendDM(parsed.userId, text);
          } else {
            return channel.sendMessage(parsed.chatId, text);
          }
        },
      });
    } catch (error) {
      console.error('[CliqWebhook] Handler error:', error);
    }
  });

  return router;
}
