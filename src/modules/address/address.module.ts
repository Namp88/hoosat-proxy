import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';

/**
 * Address and balance operations module
 */
@Module({
  controllers: [AddressController],
})
export class AddressModule {}
