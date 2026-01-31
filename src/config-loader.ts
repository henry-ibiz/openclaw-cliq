/**
 * Shared Zoho config loader
 * 
 * Reads from the zoho-desk-mcp-server config.json which auto-refreshes tokens
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { CliqChannelConfig } from './types';

interface ZohoConfig {
  accessToken: string;
  orgId: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

const DEFAULT_CONFIG_PATH = join(
  process.env.HOME || '~',
  'clawd/zoho-desk-mcp-server/config.json'
);

/**
 * Load Zoho config from shared config file
 */
export function loadZohoConfig(configPath?: string): ZohoConfig {
  const path = configPath || DEFAULT_CONFIG_PATH;
  
  if (!existsSync(path)) {
    throw new Error(`Zoho config not found at: ${path}`);
  }
  
  const content = readFileSync(path, 'utf-8');
  return JSON.parse(content) as ZohoConfig;
}

/**
 * Create CliqChannelConfig from shared Zoho config
 */
export function createCliqConfig(options: {
  botUniqueName: string;
  configPath?: string;
  webhookSecret?: string;
  apiBaseUrl?: string;
}): CliqChannelConfig {
  const zohoConfig = loadZohoConfig(options.configPath);
  
  return {
    apiToken: zohoConfig.accessToken,
    orgId: zohoConfig.orgId,
    botUniqueName: options.botUniqueName,
    webhookSecret: options.webhookSecret,
    apiBaseUrl: options.apiBaseUrl,
  };
}

/**
 * Get fresh token (re-reads config file)
 * Call this before API requests to always get the latest refreshed token
 */
export function getFreshToken(configPath?: string): string {
  const config = loadZohoConfig(configPath);
  return config.accessToken;
}
