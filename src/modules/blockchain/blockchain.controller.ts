import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { HoosatClientService } from '../../shared/services/hoosat-client.service';
import { GetBlockDto, GetBlocksDto } from './dto/get-block.dto';

/**
 * Blockchain operations endpoints
 */
@ApiTags('blockchain')
@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly hoosatClient: HoosatClientService) {}

  /**
   * Get selected tip hash
   */
  @Get('tip-hash')
  @ApiOperation({
    summary: 'Get selected tip hash',
    description: 'Returns the hash of the current virtual selected parent block (tip of the chain)',
  })
  @ApiResponse({
    status: 200,
    description: 'Selected tip hash retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          selectedTipHash: 'a1b2c3d4e5f6789012345678901234567890123456789012345678901234abcd',
        },
      },
    },
  })
  async getSelectedTipHash() {
    return this.hoosatClient.getClient().getSelectedTipHash();
  }

  /**
   * Get block by hash
   */
  @Get('block/:hash')
  @ApiOperation({
    summary: 'Get block by hash',
    description: 'Returns block data including header, transactions (optional), and verbose metadata',
  })
  @ApiParam({
    name: 'hash',
    description: 'Block hash (64 hex characters)',
    example: 'a1b2c3d4e5f6789012345678901234567890123456789012345678901234abcd',
  })
  @ApiResponse({
    status: 200,
    description: 'Block retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          transactions: [],
          header: {
            version: 1,
            parents: [],
            hashMerkleRoot: 'abc123...',
            timestamp: '1704902400000',
            bits: 486604799,
            nonce: '12345',
            daaScore: '100000',
            blueScore: '100000',
          },
          verboseData: {
            hash: 'abc123...',
            difficulty: 1.5,
            selectedParentHash: 'def456...',
            isChainBlock: true,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid block hash format',
  })
  async getBlock(@Param('hash') hash: string, @Query('includeTransactions') includeTransactions?: string) {
    const includeTx = includeTransactions === 'false' ? false : true;
    return this.hoosatClient.getClient().getBlock(hash, includeTx);
  }

  /**
   * Get multiple blocks
   */
  @Get('blocks')
  @ApiOperation({
    summary: 'Get multiple blocks',
    description: 'Returns multiple blocks starting from the specified hash up to the current virtual',
  })
  @ApiResponse({
    status: 200,
    description: 'Blocks retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          blocks: [],
          blockHashes: ['abc123...', 'def456...', 'ghi789...'],
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid block hash format',
  })
  async getBlocks(@Query() dto: GetBlocksDto) {
    return this.hoosatClient.getClient().getBlocks(dto.lowHash, dto.includeTransactions ?? false);
  }

  /**
   * Get block count
   */
  @Get('count')
  @ApiOperation({
    summary: 'Get block count',
    description: 'Returns the current number of blocks and headers in the blockchain',
  })
  @ApiResponse({
    status: 200,
    description: 'Block count retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          blockCount: '123456',
          headerCount: '123500',
        },
      },
    },
  })
  async getBlockCount() {
    return this.hoosatClient.getClient().getBlockCount();
  }

  /**
   * Get block DAG info
   */
  @Get('dag-info')
  @ApiOperation({
    summary: 'Get block DAG information',
    description:
      'Returns comprehensive information about the current state of the block DAG including network name, block count, difficulty, and DAA score',
  })
  @ApiResponse({
    status: 200,
    description: 'DAG info retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          tipHashes: ['abc123...', 'def456...'],
          virtualParentHashes: ['ghi789...'],
          networkName: 'hoosat-mainnet',
          blockCount: '123456',
          headerCount: '123500',
          difficulty: 1000000.5,
          pastMedianTime: '1704902400000',
          pruningPointHash: 'xyz999...',
          virtualDaaScore: '100000',
        },
      },
    },
  })
  async getBlockDagInfo() {
    return this.hoosatClient.getClient().getBlockDagInfo();
  }
}
