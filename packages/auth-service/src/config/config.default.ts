import { ConfigData } from './config.interface';

export const DEFAULT_CONFIG: ConfigData = {
  env: 'development',
  db: {
    url: process.env.DATABASE_URL,
  },
  sendGrid: {
    apiKey: '',
    verifiedEmail: '',
  },
  auth: {
    jwtSecret: '',
    expireIn: 0,
  },
  debug: 'qapi:*',
  port: 3000,
  logLevel: 'info',
  newRelicKey: '',
};
