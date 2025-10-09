import { Module } from '@nestjs/common';
import { NetworkController } from './network.controller';

/**
 * Network information module
 */
@Module({
  controllers: [NetworkController],
})
export class NetworkModule {}
