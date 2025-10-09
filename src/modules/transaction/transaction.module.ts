import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';

/**
 * Transaction operations module
 */
@Module({
  controllers: [TransactionController],
})
export class TransactionModule {}
