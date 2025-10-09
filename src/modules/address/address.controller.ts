import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { HoosatClientService } from '@client/client.service';
import { AddressesDto } from './dto/address.dto';

/**
 * Address and balance operations endpoints
 */
@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly hoosatClient: HoosatClientService) {}

  /**
   * Get balance for a single address
   */
  @Get(':address/balance')
  @ApiOperation({
    summary: 'Get address balance',
    description: 'Returns the balance in sompi (smallest unit) for the specified Hoosat address',
  })
  @ApiParam({
    name: 'address',
    description: 'Hoosat address',
    example: 'hoosat:qz8hek32xdryqstk6ptvvfzmrsrns95h7nd2r9f55epnxx7eummegyxa7f2lu',
  })
  @ApiResponse({
    status: 200,
    description: 'Balance retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          balance: '1000000000',
        },
        timestamp: 1760026085383,
        path: '/api/v1/address/{{address}}/balance',
      },
    },
  })
  async getBalance(@Param('address') address: string) {
    return this.hoosatClient.getClient().getBalance(address);
  }

  /**
   * Get balances for multiple addresses
   */
  @Post('balances')
  @ApiOperation({
    summary: 'Get balances for multiple addresses',
    description: 'Returns balances in sompi for multiple Hoosat addresses (max 1000)',
  })
  @ApiResponse({
    status: 200,
    description: 'Balances retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          balances: [
            {
              address: 'hoosat:qz7ulu8mmmul6hdcnssmjnt28h2xfer8dz9nfqamvvh86ngef4q8dvzxcjdqe',
              balance: '1000000000',
            },
            {
              address: 'hoosat:qyp4ka9p6mlc2gfrd08m5zau9q4jt4mj93k3gnq9f0x4zcwglmqkgxgjhqk7g',
              balance: '500000000',
            },
          ],
        },
        timestamp: 1760026085383,
        path: '/api/v1/address/balances',
      },
    },
  })
  async getBalances(@Body() dto: AddressesDto) {
    return this.hoosatClient.getClient().getBalancesByAddresses(dto.addresses);
  }

  /**
   * Get UTXOs for multiple addresses
   */
  @Post('utxos')
  @ApiOperation({
    summary: 'Get UTXOs for addresses',
    description: 'Returns all unspent transaction outputs (UTXOs) for the specified addresses (max 1000)',
  })
  @ApiResponse({
    status: 200,
    description: 'UTXOs retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          utxos: [
            {
              address: 'hoosat:qz7ulu8mmmul6hdcnssmjnt28h2xfer8dz9nfqamvvh86ngef4q8dvzxcjdqe',
              outpoint: {
                transactionId: 'abc123...',
                index: 0,
              },
              utxoEntry: {
                amount: '100000000',
                scriptPublicKey: {
                  version: 0,
                  scriptPublicKey: 'def456...',
                },
                blockDaaScore: '50000',
                isCoinbase: false,
              },
            },
            {
              address: 'hoosat:qz7ulu8mmmul6hdcnssmjnt28h2xfer8dz9nfqamvvh86ngef4q8dvzxcjdqe',
              outpoint: {
                transactionId: 'ghi789...',
                index: 1,
              },
              utxoEntry: {
                amount: '900000000',
                scriptPublicKey: {
                  version: 0,
                  scriptPublicKey: 'jkl012...',
                },
                blockDaaScore: '55000',
                isCoinbase: true,
              },
            },
          ],
        },
        timestamp: 1760026085383,
        path: '/api/v1/address/utxos',
      },
    },
  })
  async getUtxos(@Body() dto: AddressesDto) {
    return this.hoosatClient.getClient().getUtxosByAddresses(dto.addresses);
  }
}
