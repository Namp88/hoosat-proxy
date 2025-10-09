import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HoosatClientService } from '@client/client.service';
import { SubmitTransactionDto } from './dto/submit-transaction.dto';

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
  @ApiResponse({
    status: 400,
    description: 'Invalid transaction format or transaction rejected by network',
    schema: {
      example: {
        success: false,
        error: 'Transaction validation failed: insufficient funds',
        timestamp: '2025-01-10T12:00:00.000Z',
        path: '/api/v1/transaction/submit',
      },
    },
  })
  async submitTransaction(@Body() dto: SubmitTransactionDto) {
    const { allowOrphan, ...transaction } = dto;
    return this.hoosatClient.getClient().submitTransaction(transaction as any, allowOrphan ?? false);
  }
}
