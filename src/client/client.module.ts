import { Module, Global } from '@nestjs/common';
import { HoosatClientService } from './client.service';

@Global()
@Module({
  providers: [HoosatClientService],
  exports: [HoosatClientService],
})
export class ClientModule {}
