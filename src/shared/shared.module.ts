import { Module, Global } from '@nestjs/common';
import { HoosatClientService } from './services/hoosat-client.service';

/**
 * Shared module for global services
 * @Global decorator makes this module's exports available everywhere
 */
@Global()
@Module({
  providers: [HoosatClientService],
  exports: [HoosatClientService],
})
export class SharedModule {}
