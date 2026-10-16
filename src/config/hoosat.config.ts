import { registerAs } from '@nestjs/config';
import { DEFAULT_NODE_PORT, parseNodes } from './hoosat-nodes';

export default registerAs('hoosat', () => ({
  host: process.env.HOOSAT_HOST || '127.0.0.1',
  port: parseInt(process.env.HOOSAT_PORT || '', 10) || DEFAULT_NODE_PORT,
  timeout: parseInt(process.env.HOOSAT_TIMEOUT || '', 10) || 10000,
  nodes: parseNodes(process.env.HOOSAT_NODES),

  api: {
    prefix: process.env.API_PREFIX || 'api',
    version: process.env.API_VERSION || 'v1',
  },
}));
