import { registerAs } from '@nestjs/config';

export default registerAs('hoosat', () => ({
  host: process.env.HOOSAT_HOST || '127.0.0.1',
  port: parseInt(process.env.HOOSAT_PORT || '', 10) || 42420,
  timeout: parseInt(process.env.HOOSAT_TIMEOUT || '', 10) || 10000,

  api: {
    prefix: process.env.API_PREFIX || 'api',
    version: process.env.API_VERSION || 'v1',
  },
}));
