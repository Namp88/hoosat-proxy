import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import hoosatConfig from './config/hoosat.config';
import { ClientModule } from '@client/client.module';
import { ResponseInterceptor } from '@interceptors/response.interceptor';
import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { AppController } from './app.controller';
import { NodeModule } from '@modules/node/node.module';
import { BlockchainModule } from '@modules/blockchain/blockchain.module';
import { NetworkModule } from '@modules/network/network.module';
import { AddressModule } from '@modules/address/address.module';
import { MempoolModule } from '@modules/mempool/mempool.module';
import { TransactionModule } from '@modules/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [hoosatConfig],
      envFilePath: ['.env'],
    }),
    ClientModule,
    NodeModule,
    BlockchainModule,
    NetworkModule,
    AddressModule,
    MempoolModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
