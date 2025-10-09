import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { HoosatClientService } from '@client/client.service';
import { GetMempoolEntriesDto, GetMempoolEntriesByAddressesDto } from './dto/mempool.dto';
import { FeePriority, HoosatFeeEstimator } from 'hoosat-sdk';

/**
 * Mempool operations endpoints
 */
@ApiTags('mempool')
@Controller('mempool')
export class MempoolController {
  constructor(private readonly hoosatClient: HoosatClientService) {}

  /**
   * Get mempool entry by transaction ID
   */
  @Get('entry/:txId')
  @ApiOperation({
    summary: 'Get mempool entry by transaction ID',
    description: 'Returns a specific transaction from the mempool by its transaction ID, including fee and mass information',
  })
  @ApiParam({
    name: 'txId',
    description: 'Transaction ID (64 hex characters)',
    example: 'abc123def456789012345678901234567890123456789012345678901234abcd',
  })
  @ApiResponse({
    status: 200,
    description: 'Mempool entry retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          transaction: {
            transactionId: 'abc123...',
            inputs: [
              {
                previousOutpoint: {
                  transactionId: 'string',
                  index: 0,
                },
                signatureScript: 'string',
                sequence: 'string',
                sigOpCount: 0,
              },
            ],
            outputs: [
              {
                amount: 'string',
                scriptPublicKey: {
                  scriptPublicKey: 'string',
                  version: 0,
                },
                verboseData: {
                  scriptPublicKeyType: 'string',
                  scriptPublicKeyAddress: 'string',
                },
              },
            ],
            version: 0,
            lockTime: '0',
            subnetworkId: '0000000000000000000000000000000000000000',
          },
          fee: '1000',
          mass: '1500',
          isOrphan: false,
        },
      },
    },
  })
  async getMempoolEntry(
    @Param('txId') txId: string,
    @Query('includeOrphanPool') includeOrphanPool?: string,
    @Query('filterTransactionPool') filterTransactionPool?: string
  ) {
    const includeOrphan = includeOrphanPool === 'false' ? false : true;
    const filterPool = filterTransactionPool === 'true' ? true : false;

    return this.hoosatClient.getClient().getMempoolEntry(txId, includeOrphan, filterPool);
  }

  /**
   * Get all mempool entries
   */
  @Get('entries')
  @ApiOperation({
    summary: 'Get all mempool entries',
    description: 'Returns all pending transactions currently in the mempool, useful for analyzing network activity and fee estimates',
  })
  @ApiResponse({
    status: 200,
    description: 'Mempool entries retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          entries: [
            {
              transaction: {
                transactionId: 'abc123...',
                inputs: [
                  {
                    previousOutpoint: {
                      transactionId: 'string',
                      index: 0,
                    },
                    signatureScript: 'string',
                    sequence: 'string',
                    sigOpCount: 0,
                  },
                ],
                outputs: [
                  {
                    amount: 'string',
                    scriptPublicKey: {
                      scriptPublicKey: 'string',
                      version: 0,
                    },
                    verboseData: {
                      scriptPublicKeyType: 'string',
                      scriptPublicKeyAddress: 'string',
                    },
                  },
                ],
                version: 0,
                lockTime: '0',
                subnetworkId: '0000000000000000000000000000000000000000',
              },
              fee: '1000',
              mass: '1500',
              isOrphan: false,
            },
          ],
        },
      },
    },
  })
  async getMempoolEntries(@Query() dto: GetMempoolEntriesDto) {
    return this.hoosatClient.getClient().getMempoolEntries(dto.includeOrphanPool ?? true, dto.filterTransactionPool ?? false);
  }

  /**
   * Get mempool entries by addresses
   */
  @Post('entries-by-addresses')
  @ApiOperation({
    summary: 'Get mempool entries by addresses',
    description: 'Returns pending transactions related to the specified addresses, separated into sending and receiving transactions',
  })
  @ApiResponse({
    status: 200,
    description: 'Mempool entries retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          entries: [
            {
              address: 'hoosat:qz7ulu8mmmul6hdcnssmjnt28h2xfer8dz9nfqamvvh86ngef4q8dvzxcjdqe',
              sending: [
                {
                  transaction: {
                    transactionId: 'abc123...',
                    inputs: [],
                    outputs: [],
                    version: 0,
                    lockTime: '0',
                    subnetworkId: '0000000000000000000000000000000000000000',
                    gas: '0',
                    payload: '',
                  },
                  fee: '1000',
                  mass: '1500',
                  isOrphan: false,
                },
              ],
              receiving: [
                {
                  transaction: {
                    transactionId: 'def456...',
                    inputs: [],
                    outputs: [],
                    version: 0,
                    lockTime: '0',
                    subnetworkId: '0000000000000000000000000000000000000000',
                    gas: '0',
                    payload: '',
                  },
                  fee: '500',
                  mass: '1200',
                  isOrphan: false,
                },
              ],
            },
          ],
        },
      },
    },
  })
  async getMempoolEntriesByAddresses(@Body() dto: GetMempoolEntriesByAddressesDto) {
    return this.hoosatClient
      .getClient()
      .getMempoolEntriesByAddresses(dto.addresses, dto.includeOrphanPool ?? false, dto.filterTransactionPool ?? false);
  }

  @Get('fee-estimate')
  @ApiOperation({
    summary: 'Get estimate fee',
    description: 'Estimates fee for a transaction using mass-based calculation',
  })
  @ApiQuery({
    name: 'priority',
    required: true,
    type: String,
    description: `Fee priority level. Possible values: ${FeePriority.Low}, ${FeePriority.Normal}, ${FeePriority.High}, ${FeePriority.Urgent}.`,
    example: FeePriority.Normal,
    default: FeePriority.Normal,
  })
  @ApiQuery({
    name: 'inputs',
    required: false,
    type: Number,
    description: 'Number of transaction inputs',
    example: 1,
    default: 1,
  })
  @ApiQuery({
    name: 'outputs',
    required: false,
    type: Number,
    description: 'Number of transaction outputs',
    example: 1,
    default: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Estimate fee retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          success: true,
          data: {
            feeRate: 1,
            totalFee: '2500',
            priority: 'normal',
            percentile: 0,
            basedOnSamples: 0,
          },
          timestamp: 1760039577876,
          path: '/api/v1/mempool/fee-estimate?priority=normal&inputs=1&outputs=1',
        },
      },
    },
  })
  async getFeeRecommendation(
    @Query('priority') priority: FeePriority,
    @Query('inputs') inputs: number = 1,
    @Query('outputs') outputs: number = 1
  ) {
    const feeEstimator = new HoosatFeeEstimator(this.hoosatClient.getClient());

    return feeEstimator.estimateFee(priority, inputs, outputs);
  }
}
