import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HoosatClientService } from '@client/client.service';
import { EstimateHashrateDto } from './dto/estimate-hashrate.dto';

/**
 * Node information endpoints
 */
@ApiTags('node')
@Controller('node')
export class NodeController {
  constructor(private readonly hoosatClient: HoosatClientService) {}

  /**
   * Get node information
   */
  @Get('info')
  @ApiOperation({
    summary: 'Get node information',
    description: 'Returns information about the connected Hoosat node including version, sync status, and UTXO index status',
  })
  @ApiResponse({
    status: 200,
    description: 'Node information retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          p2pId: 'abc123...',
          mempoolSize: '45',
          serverVersion: '0.1.0',
          isUtxoIndexed: true,
          isSynced: true,
        },
      },
    },
  })
  async getInfo() {
    return this.hoosatClient.getClient().getInfo();
  }

  /**
   * Get virtual selected parent blue score
   */
  @Get('blue-score')
  @ApiOperation({
    summary: 'Get virtual selected parent blue score',
    description: 'Returns the blue score of the virtual selected parent, representing the current blockchain height',
  })
  @ApiResponse({
    status: 200,
    description: 'Blue score retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          blueScore: '123456',
        },
      },
    },
  })
  async getBlueScore() {
    return this.hoosatClient.getClient().getVirtualSelectedParentBlueScore();
  }

  /**
   * Estimate network hashrate
   */
  @Get('hashrate')
  @ApiOperation({
    summary: 'Estimate network hashrate',
    description: 'Estimates the network hashrate over a specified window of blocks',
  })
  @ApiResponse({
    status: 200,
    description: 'Hashrate estimated successfully',
    schema: {
      example: {
        success: true,
        data: {
          networkHashesPerSecond: '1500000000000',
        },
      },
    },
  })
  async estimateHashrate(@Query() dto: EstimateHashrateDto) {
    return this.hoosatClient.getClient().estimateNetworkHashesPerSecond(dto.windowSize, dto.startHash);
  }

  /**
   * Get coin supply information
   */
  @Get('coin-supply')
  @ApiOperation({
    summary: 'Get coin supply',
    description: 'Returns information about circulating and maximum coin supply',
  })
  @ApiResponse({
    status: 200,
    description: 'Coin supply retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          circulatingSupply: '5000000000000000',
          maxSupply: '10000000000000000',
        },
      },
    },
  })
  async getCoinSupply() {
    return this.hoosatClient.getClient().getCoinSupply();
  }

  /**
   * Health check endpoint
   */
  @Get('health')
  @ApiOperation({
    summary: 'Health check',
    description: 'Check if the node connection is healthy',
  })
  @ApiResponse({
    status: 200,
    description: 'Health status',
    schema: {
      example: {
        success: true,
        data: {
          healthy: true,
        },
      },
    },
  })
  async checkHealth() {
    const healthy = await this.hoosatClient.isHealthy();
    return { healthy };
  }
}
