import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  /**
   * Redirect root path to API documentation
   */
  @Get()
  getRoot(@Res() res) {
    return res.redirect('/docs');
  }

  @Get('info')
  getApiInfo() {
    return {
      name: 'Hoosat Proxy API',
      version: '0.1.0',
      description: 'Public REST API proxy for Hoosat blockchain',
      documentation: '/docs',
      endpoints: {
        node: '/api/v1/node',
        blockchain: '/api/v1/blockchain',
        network: '/api/v1/network',
        address: '/api/v1/address',
        mempool: '/api/v1/mempool',
        transaction: '/api/v1/transaction',
      },
      repository: 'https://github.com/Namp88/hoosat-proxy',
      license: 'MIT',
    };
  }
}
