import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { HoosatClientService } from '@client/client.service';
import { SubmitTransactionDto } from './dto/submit-transaction.dto';
import { GetTransactionStatusDto } from './dto/get-transaction-status.dto';
import { TransactionStatusResponseDto } from './dto/transaction-status-response.dto';
import { CalculateMinFeeDto, CalculateMinFeeResponseDto } from './dto/calculate-min-fee.dto';
import { HoosatCrypto } from 'hoosat-sdk';

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

  /**
   * Calculate minimum transaction fee
   */
  @Post('calculate-min-fee')
  @ApiOperation({
    summary: 'Calculate minimum transaction fee',
    description:
      'Calculates the minimum required fee for a transaction using MASS-based formula. ' +
      'Supports both automatic mode (provide address to fetch UTXOs) and manual mode (provide inputs/outputs count).',
  })
  @ApiResponse({
    status: 200,
    description: 'Minimum fee calculated successfully',
    type: CalculateMinFeeResponseDto,
    schema: {
      example: {
        success: true,
        data: {
          minFee: '6653',
          inputs: 5,
          outputs: 2,
          payloadSize: 0,
          method: 'automatic',
        },
        timestamp: '2025-01-10T12:00:00.000Z',
        path: '/api/v1/transaction/calculate-min-fee',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request - must provide either address OR (inputs and outputs)',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async calculateMinFee(@Body() dto: CalculateMinFeeDto): Promise<CalculateMinFeeResponseDto> {
    const payloadSize = dto.payloadSize ?? 0;

    // Automatic mode: calculate based on address UTXOs
    if (dto.address) {
      const minFee = await this.hoosatClient.getClient().calculateMinFee(dto.address, payloadSize);

      // Get UTXOs to know the actual counts
      const utxosResult = await this.hoosatClient.getClient().getUtxosByAddresses([dto.address]);
      const utxosCount = utxosResult.ok && utxosResult.result ? utxosResult.result.utxos.length : 0;

      return {
        minFee,
        inputs: utxosCount,
        outputs: 2, // Standard: recipient + change
        payloadSize,
        method: 'automatic',
      };
    }

    // Manual mode: calculate based on provided inputs/outputs
    if (dto.inputs !== undefined && dto.outputs !== undefined) {
      const minFee = HoosatCrypto.calculateMinFee(dto.inputs, dto.outputs, payloadSize);

      return {
        minFee,
        inputs: dto.inputs,
        outputs: dto.outputs,
        payloadSize,
        method: 'manual',
      };
    }

    // Neither mode provided
    throw new Error('Must provide either "address" for automatic mode OR both "inputs" and "outputs" for manual mode');
  }
}
