#!/bin/bash
# Quick test of Cliq API with existing Zoho credentials

CONFIG_FILE="$HOME/clawd/zoho-desk-mcp-server/config.json"

ACCESS_TOKEN=$(grep '"accessToken"' "$CONFIG_FILE" | sed 's/.*: "\(.*\)".*/\1/' | tr -d ',')
ORG_ID=$(grep '"orgId"' "$CONFIG_FILE" | sed 's/.*: "\(.*\)".*/\1/' | tr -d ',')

echo "Testing Cliq API..."
echo "Org ID: $ORG_ID"
echo "Token: ${ACCESS_TOKEN:0:20}..."
echo ""

# Test: List channels
echo "📋 Listing channels..."
curl -s -X GET "https://cliq.zoho.com/api/v2/channels" \
  -H "Authorization: Zoho-oauthtoken $ACCESS_TOKEN" \
  -H "orgId: $ORG_ID" | head -500

echo ""
echo ""

# Test: Get current user info
echo "👤 Getting user info..."
curl -s -X GET "https://cliq.zoho.com/api/v2/currentuser" \
  -H "Authorization: Zoho-oauthtoken $ACCESS_TOKEN" \
  -H "orgId: $ORG_ID"

echo ""
