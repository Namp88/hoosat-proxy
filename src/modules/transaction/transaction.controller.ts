import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { HoosatClientService } from '@client/client.service';
import { SubmitTransactionDto } from './dto/submit-transaction.dto';
import { GetTransactionStatusDto } from './dto/get-transaction-status.dto';
import { TransactionStatusResponseDto } from './dto/transaction-status-response.dto';

/**
 * Transaction operations endpoints
 */
@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly hoosatClient: HoosatClientService) {}

  /**
   * Submit a signed transaction to the network
   */
  @Post('submit')
  @ApiOperation({
    summary: 'Submit transaction',
    description: 'Submits a signed transaction to the network for processing and inclusion in the blockchain',
  })
  @ApiResponse({
    status: 200,
    description: 'Transaction submitted successfully',
    schema: {
      example: {
        success: true,
        data: {
          transactionId: 'abc123def456789012345678901234567890123456789012345678901234abcd',
        },
      },
    },
  })
  async submitTransaction(@Body() dto: SubmitTransactionDto) {
    const { allowOrphan, ...transaction } = dto;
    return this.hoosatClient.getClient().submitTransaction(transaction as any, allowOrphan ?? false);
  }

  /**
   * Get transaction status
   */
  @Get(':txId/status')
  @ApiOperation({
    summary: 'Get transaction status',
    description:
      'Check if transaction is PENDING (in mempool), CONFIRMED (in blockchain), or NOT_FOUND. ' +
      'Requires node to be started with --utxoindex flag for CONFIRMED status detection.',
  })
  @ApiParam({
    name: 'txId',
    description: 'Transaction ID (hash)',
    example: 'abc123def456789...',
  })
  @ApiQuery({
    name: 'senderAddress',
    description: 'Sender address',
    example: 'hoosat:qzsender123...',
    required: true,
  })
  @ApiQuery({
    name: 'recipientAddress',
    description: 'Recipient address',
    example: 'hoosat:qzrecipient456...',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Transaction status retrieved successfully',
    type: TransactionStatusResponseDto,
    schema: {
      example: {
        success: true,
        data: {
          status: 'PENDING',
          details: {
            txId: 'abc123def456...',
            inMempool: true,
            isOrphan: false,
            fee: '1000000',
            mass: '250',
            message: 'Transaction is in mempool, waiting for confirmation',
          },
        },
        timestamp: '2025-01-10T12:00:00.000Z',
        path: '/api/v1/transaction/abc123def456.../status',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid transaction ID or addresses',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getTransactionStatus(
    @Param('txId') txId: string,
    @Query() query: GetTransactionStatusDto,
  ) {
    return this.hoosatClient.getClient().getTransactionStatus(
      txId,
      query.senderAddress,
      query.recipientAddress,
    );
  }
}
