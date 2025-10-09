import { registerAs } from '@nestjs/config';

/**
 * Hoosat node configuration
 * Can be overridden via environment variables
 */
export default registerAs('hoosat', () => ({
  // Node connection settings
  host: process.env.HOOSAT_HOST || '127.0.0.1',
  port: parseInt(process.env.HOOSAT_PORT || '', 10) || 42420,
  timeout: parseInt(process.env.HOOSAT_TIMEOUT || '', 10) || 10000,

  // Event manager settings
  events: {
    maxReconnectAttempts: parseInt(process.env.HOOSAT_MAX_RECONNECT_ATTEMPTS || '', 10) || 5,
    reconnectDelay: parseInt(process.env.HOOSAT_RECONNECT_DELAY || '', 10) || 2000,
    maxSubscribedAddresses: parseInt(process.env.HOOSAT_MAX_SUBSCRIBED_ADDRESSES || '', 10) || 1000,
    debug: process.env.HOOSAT_DEBUG === 'true',
  },

  // API settings
  api: {
    prefix: process.env.API_PREFIX || 'api',
    version: process.env.API_VERSION || 'v1',
  },
}));
