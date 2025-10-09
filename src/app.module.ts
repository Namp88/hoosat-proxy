import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import hoosatConfig from './config/hoosat.config';
import { SharedModule } from './shared/shared.module';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { NodeModule } from './modules/node/node.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { NetworkModule } from './modules/network/network.module';
import { AddressModule } from './modules/address/address.module';
import { MempoolModule } from './modules/mempool/mempool.module';
import { TransactionModule } from './modules/transaction/transaction.module';

/**
 * Root application module
 */
@Module({
  imports: [
    // Configuration module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [hoosatConfig],
      envFilePath: ['.env.example', '.env'],
    }),

    // Shared module with global services
    SharedModule,

    // Feature modules
    NodeModule,
    BlockchainModule,
    NetworkModule,
    AddressModule,
    MempoolModule,
    TransactionModule,
  ],
  providers: [
    // Global response interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },

    // Global exception filter
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
