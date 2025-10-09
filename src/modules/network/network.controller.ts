import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HoosatClientService } from '@client/client.service';

/**
 * Network information endpoints
 */
@ApiTags('network')
@Controller('network')
export class NetworkController {
  constructor(private readonly hoosatClient: HoosatClientService) {}

  /**
   * Get current network
   */
  @Get('info')
  @ApiOperation({
    summary: 'Get current network',
    description: 'Returns the network name that the node is currently running on (mainnet, testnet, simnet, devnet)',
  })
  @ApiResponse({
    status: 200,
    description: 'Network information retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          currentNetwork: 'hoosat-mainnet',
        },
      },
    },
  })
  async getCurrentNetwork() {
    return this.hoosatClient.getClient().getCurrentNetwork();
  }

  /**
   * Get peer addresses
   */
  @Get('peers')
  @ApiOperation({
    summary: 'Get peer addresses',
    description: 'Returns list of known peer addresses in the current network, including banned addresses',
  })
  @ApiResponse({
    status: 200,
    description: 'Peer addresses retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          addresses: [
            {
              address: '192.168.1.100:42420',
              isIPv6: false,
              host: '192.168.1.100',
              port: 42420,
            },
            {
              address: '[2001:db8::1]:42420',
              isIPv6: true,
              host: '2001:db8::1',
              port: 42420,
            },
          ],
          bannedAddresses: [
            {
              address: '10.0.0.50:42420',
              isIPv6: false,
              host: '10.0.0.50',
              port: 42420,
            },
          ],
        },
      },
    },
  })
  async getPeerAddresses() {
    return this.hoosatClient.getClient().getPeerAddresses();
  }

  /**
   * Get connected peer info
   */
  @Get('connected-peers')
  @ApiOperation({
    summary: 'Get connected peer information',
    description:
      'Returns detailed information about all currently connected peers including connection details, user agent, and sync status',
  })
  @ApiResponse({
    status: 200,
    description: 'Connected peer information retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          peers: [
            {
              id: 'abc123',
              address: '192.168.1.100:42420',
              lastPingDuration: 45,
              isOutbound: true,
              timeOffset: 0,
              userAgent: '/hoosat:0.1.0/',
              advertisedProtocolVersion: 5,
              timeConnected: '1704902400000',
              isIbdPeer: false,
            },
            {
              id: 'def456',
              address: '10.20.30.40:42420',
              lastPingDuration: 120,
              isOutbound: false,
              timeOffset: -2,
              userAgent: '/hoosat:0.1.0/',
              advertisedProtocolVersion: 5,
              timeConnected: '1704900000000',
              isIbdPeer: true,
            },
          ],
        },
      },
    },
  })
  async getConnectedPeerInfo() {
    return this.hoosatClient.getClient().getConnectedPeerInfo();
  }
}
