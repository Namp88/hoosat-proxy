import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { HoosatClientService } from '@client/client.service';

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
        timestamp: 1760026085383,
        path: '/api/v1/block/tip-hash',
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
    example: 'cef41032d19306ec67ba59fc381e981c06c7795980b9f0751995428773290267',
  })
  @ApiQuery({
    name: 'includeTransactions',
    required: false,
    type: Boolean,
    description: 'Include full transaction data in response',
    example: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Block retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          transactions: [
            {
              inputs: [],
              outputs: [
                {
                  amount: '81649658',
                  scriptPublicKey: {
                    version: 0,
                    scriptPublicKey: '206bd6ab37f28d83b57291055ffcc20178b9eacad709fd56a633bcf742cd4fcf41ac',
                  },
                  verboseData: {
                    scriptPublicKeyType: 'pubkey',
                    scriptPublicKeyAddress: 'hoosat:qp4ad2eh72xc8dtjjyz4llxzq9utn6k26uyl644xxw70wskdfl85zsqj9k4vz',
                  },
                },
              ],
              version: 0,
              lockTime: '0',
              subnetworkId: '0100000000000000000000000000000000000000',
              gas: '0',
              payload:
                '0aa98c0400000000897f556100000000000022206f7db0676992dba400ba81b936584097f706349e81e7483eca0291560467e582ac312e342e352d352f4261696b616c4d696e655f504f4f4c53',
              verboseData: {
                transactionId: 'bed378cdea445ef2b92ac897c7ae41902026b0116ff9b80139d84b3d3a4036ff',
                hash: '37bb6ab1408c2a8c64b71d2c4176ffa1cb76f962bbcd6bbd061092096d3a5292',
                mass: '0',
                blockHash: 'be2a28c935f24dd2f7d0638b2893c961a1d78a567d2541a9229e3b9e4095cf93',
                blockTime: '1760029024561',
              },
            },
          ],
          header: {
            parents: [
              {
                parentHashes: [
                  'e69bbe78a096d17c5a3f915dc4606768b5976f14460ac7e2740c427c5e807f24',
                  'ef3c43bc60a3ea1958316a052a49d8b60f28f5d5ea04ef30d0c8768dbd560264',
                  '488311240608063e69a16c33d4cfc273be036f3b1c2a0e408b49c92b85b102b1',
                  '20ea4cd74795f7285122bd33ca3ba062af53dee10d3c2ec3700aa29469066be0',
                ],
              },
            ],
            version: 5,
            hashMerkleRoot: '37bb6ab1408c2a8c64b71d2c4176ffa1cb76f962bbcd6bbd061092096d3a5292',
            acceptedIdMerkleRoot: '4e0f640c34a50423d314a5bb1ea7d78f05a29c6abe1be335a96ffd0a76362d4d',
            utxoCommitment: '747de6177e2a30aa79ffd16e5167383084ee56dfe5a2403a75e957dd17f13b45',
            timestamp: '1760029024561',
            bits: 490169269,
            nonce: '11676241686759156909',
            daaScore: '78888773',
            blueWork: '3128f9618679c69827',
            blueScore: '76327178',
            pruningPoint: '9b35e4979c5f3e5cc0a1d583ad00810f6e63e98fafa629f3914d85300bf227de',
          },
          verboseData: {
            transactionIds: ['bed378cdea445ef2b92ac897c7ae41902026b0116ff9b80139d84b3d3a4036ff'],
            childrenHashes: [
              '0b6a62204f2ad9f26c7fb5174bbb54285b3ea3be0c6233145a1ce5424d6e7b62',
              '066bc83d0fc24213a8cdfa21780e71600fbe8f67fbbe4cdcfb670d144397d1de',
              '5ad30a5fd5f43c23b18b063cfd2cedccb694c62c36b996b4e1c1e265ddcfc339',
            ],
            mergeSetBluesHashes: [
              'ef3c43bc60a3ea1958316a052a49d8b60f28f5d5ea04ef30d0c8768dbd560264',
              'e69bbe78a096d17c5a3f915dc4606768b5976f14460ac7e2740c427c5e807f24',
              '20ea4cd74795f7285122bd33ca3ba062af53dee10d3c2ec3700aa29469066be0',
              '488311240608063e69a16c33d4cfc273be036f3b1c2a0e408b49c92b85b102b1',
            ],
            mergeSetRedsHashes: [],
            hash: 'be2a28c935f24dd2f7d0638b2893c961a1d78a567d2541a9229e3b9e4095cf93',
            difficulty: 38770604.55,
            selectedParentHash: 'ef3c43bc60a3ea1958316a052a49d8b60f28f5d5ea04ef30d0c8768dbd560264',
            isHeaderOnly: false,
            blueScore: '76327178',
            isChainBlock: true,
          },
        },
        timestamp: 1760036711452,
        path: '/api/v1/blockchain/block/be2a28c935f24dd2f7d0638b2893c961a1d78a567d2541a9229e3b9e4095cf93?includeTransactions=true',
      },
    },
  })
  async getBlock(@Param('hash') hash: string, @Query('includeTransactions') includeTransactions?: string) {
    const includeTx = includeTransactions === 'false' ? false : true;
    return this.hoosatClient.getClient().getBlock(hash, includeTx);
  }

  /**
   * Get multiple blocks
   */
  @Get('blocks/:lowHash')
  @ApiOperation({
    summary: 'Get multiple blocks',
    description: 'Returns multiple blocks starting from the specified hash up to the current virtual',
  })
  @ApiParam({
    name: 'lowHash',
    description: 'Starting block hash (64 hex characters)',
    example: '54c77db8bbe710ddbb1338395d0685072f97c2806f5334731e099288abf080da',
  })
  @ApiQuery({
    name: 'includeTransactions',
    required: false,
    type: Boolean,
    description: 'Include full transaction data in response',
    example: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Blocks retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          blocks: [
            {
              transactions: [
                {
                  inputs: [],
                  outputs: [
                    {
                      amount: '1551343503',
                      scriptPublicKey: {
                        version: 0,
                        scriptPublicKey: '201483d00392ad5340ef2454cd16d29fa63a96d720fb8b17616c504a558909e5daac',
                      },
                      verboseData: {
                        scriptPublicKeyType: 'pubkey',
                        scriptPublicKeyAddress: 'hoosat:qq2g85qrj2k4xs80y32v69kjn7nr49khyrack9mpd3gy54vfp8ja53ws4yezz',
                      },
                    },
                    {
                      amount: '81649658',
                      scriptPublicKey: {
                        version: 0,
                        scriptPublicKey: '206bd6ab37f28d83b57291055ffcc20178b9eacad709fd56a633bcf742cd4fcf41ac',
                      },
                      verboseData: {
                        scriptPublicKeyType: 'pubkey',
                        scriptPublicKeyAddress: 'hoosat:qp4ad2eh72xc8dtjjyz4llxzq9utn6k26uyl644xxw70wskdfl85zsqj9k4vz',
                      },
                    },
                  ],
                  version: 0,
                  lockTime: '0',
                  subnetworkId: '0100000000000000000000000000000000000000',
                  gas: '0',
                  payload:
                    '23438d0400000000897f556100000000000022208818fb6f8a07f851712d1f267ccde14398ec984749481c9ced05890a707a32f2ac312e342e382f27686f6f5f6370752f312e312e323927207669612068746e2d7374726174756d2d6272696467655f76312e332e36',
                  verboseData: {
                    transactionId: 'ce8de6b5ed2d8b1bfc359139231fa44189156f6c36fdc605e3379f1ead50ca55',
                    hash: '237841297f4f945c895f9a5d72c011aedfaf804362d795197101705f2f52e6a3',
                    mass: '0',
                    blockHash: '54c77db8bbe710ddbb1338395d0685072f97c2806f5334731e099288abf080da',
                    blockTime: '1760036890555',
                  },
                },
              ],
              header: {
                parents: [
                  {
                    parentHashes: ['c96150a6987603d23e45e9cbb2563f80db770ac6a0b6b37aec43547d7afe39cd'],
                  },
                ],
                version: 5,
                hashMerkleRoot: '237841297f4f945c895f9a5d72c011aedfaf804362d795197101705f2f52e6a3',
                acceptedIdMerkleRoot: '1218bd089093c4f250d34d645562fad6a2c855bbc9ad61c93ae9909c62fa9f75',
                utxoCommitment: '761935b5d6696ca6a3894170d9073fb76aa480336b57282b51d25c80961e5808',
                timestamp: '1760036890555',
                bits: 490348745,
                nonce: '9940694276834864755',
                daaScore: '78928404',
                blueWork: '3128f964566e955810',
                blueScore: '76366627',
                pruningPoint: '4d91d26fb8fc9c109e4fce8fafd41fe74830d900828f031606f42b065dd793cb',
              },
              verboseData: {
                transactionIds: ['ce8de6b5ed2d8b1bfc359139231fa44189156f6c36fdc605e3379f1ead50ca55'],
                childrenHashes: [
                  'e265ccb3beabb4b3e45ed2c9417d676fc9dd0112b324ad07aee711b784c91fa9',
                  '832e8d23977960b818d8dcb394b3f8fb434e6b300ea410cbf84b6c1aa97b9861',
                  '1f9ff241d2c5a267da40ed0fa8508f441e500b7f1e53b02f066b0a99f9416777',
                  'bd22f3f5c8e2588e3d11d6da910aa0e1f6c54918fc641638a49888bcb7e0e82b',
                ],
                mergeSetBluesHashes: ['e1a2b2dfe0a25360b97bead151d5ac3c926a4d73fb77210e80948cedfd9d5424'],
                mergeSetRedsHashes: [],
                hash: '54c77db8bbe710ddbb1338395d0685072f97c2806f5334731e099288abf080da',
                difficulty: 36944005.85,
                selectedParentHash: 'e1a2b2dfe0a25360b97bead151d5ac3c926a4d73fb77210e80948cedfd9d5424',
                isHeaderOnly: false,
                blueScore: '76366627',
                isChainBlock: true,
              },
            },
          ],
          blockHashes: ['54c77db8bbe710ddbb1338395d0685072f97c2806f5334731e099288abf080da'],
        },
      },
    },
  })
  async getBlocks(@Param('lowHash') lowHash: string, @Query('includeTransactions') includeTransactions?: string) {
    const includeTx = includeTransactions === 'true';
    return this.hoosatClient.getClient().getBlocks(lowHash, includeTx);
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
          blockCount: '253743',
          headerCount: '10133270',
        },
        timestamp: 1760037252112,
        path: '/api/v1/blockchain/count',
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
          tipHashes: [
            '5bb88c97331a05348cef164edd872923c182640eedc81e1084a4343e84d24cd2',
            'fe1fe2bd9134d7aa031e193127fe08fc06fb72ccf0d42c5c602db0f895047eaf',
            'fa85bc7697e46a831a56eb2898e7923770e0432fe901a2ed90eea6b13f7a1515',
            '7fa80c4314ab6859e74601326643d745c1848d8b3ef8f9b3b1a093fbd0709233',
            'c0f371aa6eee062baf44bc10ab498a7132309622bec96a12a745b8c4429a76ff',
          ],
          virtualParentHashes: [
            '7fa80c4314ab6859e74601326643d745c1848d8b3ef8f9b3b1a093fbd0709233',
            '5bb88c97331a05348cef164edd872923c182640eedc81e1084a4343e84d24cd2',
            'fa85bc7697e46a831a56eb2898e7923770e0432fe901a2ed90eea6b13f7a1515',
            'fe1fe2bd9134d7aa031e193127fe08fc06fb72ccf0d42c5c602db0f895047eaf',
            'c0f371aa6eee062baf44bc10ab498a7132309622bec96a12a745b8c4429a76ff',
          ],
          networkName: 'hoosat-mainnet',
          blockCount: '253999',
          headerCount: '10133526',
          difficulty: 36901597.14,
          pastMedianTime: '1760037277736',
          pruningPointHash: '0ec12c311cb8c3025e773ed778427b3c58ea0dc7695344a6fbd50d09bc37df10',
          virtualDaaScore: '78930476',
        },
        timestamp: 1760037301013,
        path: '/api/v1/blockchain/dag-info',
      },
    },
  })
  async getBlockDagInfo() {
    return this.hoosatClient.getClient().getBlockDagInfo();
  }
}
