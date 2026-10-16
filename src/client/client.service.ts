import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService, type ConfigType } from '@nestjs/config';
import { HoosatClient } from 'hoosat-sdk';
import { buildClientConfig } from '@config/hoosat-nodes';
import type hoosatConfig from '@config/hoosat.config';

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
    const config = this.configService.getOrThrow<ConfigType<typeof hoosatConfig>>('hoosat');

    if (config.nodes.length > 0) {
      const nodeList = config.nodes.map(node => node.name).join(', ');
      this.logger.log(`Connecting to ${config.nodes.length} Hoosat nodes with failover: ${nodeList}`);
      this.logger.log('HOOSAT_NODES is set, HOOSAT_HOST/HOOSAT_PORT are ignored');
    } else {
      this.logger.log(`Connecting to Hoosat node at ${config.host}:${config.port}`);
    }

    try {
      this.client = new HoosatClient(buildClientConfig(config));

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
