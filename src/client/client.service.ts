import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HoosatClient } from 'hoosat-sdk';

/**
 * Service for managing HoosatClient instance
 * Provides singleton access to the Hoosat blockchain node
 */
@Injectable()
export class HoosatClientService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(HoosatClientService.name);
  private client: HoosatClient;

  constructor(private configService: ConfigService) {}

  /**
   * Initialize Hoosat client on module startup
   */
  async onModuleInit() {
    const config = this.configService.get('hoosat');

    this.logger.log(`Connecting to Hoosat node at ${config.host}:${config.port}`);

    try {
      this.client = new HoosatClient({
        host: config.host,
        port: config.port,
        timeout: config.timeout,
      });

      // Test connection
      const info = await this.client.getInfo();
      if (info.ok) {
        this.logger.log(`Connected to Hoosat node v${info.result!.serverVersion}`);
        this.logger.log(`Network synced: ${info.result!.isSynced}`);
      } else {
        this.logger.error(`Failed to connect: ${info.error}`);
      }
    } catch (error) {
      this.logger.error(`Failed to initialize Hoosat client: ${error.message}`);
      throw error;
    }
  }

  /**
   * Cleanup on module destroy
   */
  onModuleDestroy() {
    if (this.client) {
      this.logger.log('Disconnecting from Hoosat node');
      this.client.disconnect();
    }
  }

  /**
   * Get HoosatClient instance
   */
  getClient(): HoosatClient {
    if (!this.client) {
      throw new Error('Hoosat client not initialized');
    }
    return this.client;
  }

  /**
   * Check if client is healthy
   */
  async isHealthy(): Promise<boolean> {
    try {
      const result = await this.client.getInfo();
      return result.ok;
    } catch {
      return false;
    }
  }
}
