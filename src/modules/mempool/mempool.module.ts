import { Module } from '@nestjs/common';
import { MempoolController } from './mempool.controller';

/**
 * Mempool operations module
 */
@Module({
  controllers: [MempoolController],
})
export class MempoolModule {}
