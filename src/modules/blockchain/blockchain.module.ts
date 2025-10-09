import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';

/**
 * Blockchain operations module
 */
@Module({
  controllers: [BlockchainController],
})
export class BlockchainModule {}
