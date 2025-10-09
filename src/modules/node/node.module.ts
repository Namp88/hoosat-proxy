import { Module } from '@nestjs/common';
import { NodeController } from './node.controller';

/**
 * Node information module
 */
@Module({
  controllers: [NodeController],
})
export class NodeModule {}
