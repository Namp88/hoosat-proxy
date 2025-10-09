import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ArrayMinSize, ArrayMaxSize } from 'class-validator';

/**
 * DTO for operations with multiple addresses
 */
export class AddressesDto {
  @ApiProperty({
    description: 'Array of Hoosat addresses (max 1000)',
    example: [
      'hoosat:qz8hek32xdryqstk6ptvvfzmrsrns95h7nd2r9f55epnxx7eummegyxa7f2lu',
      'hoosat:qp5f03mxekxu29zd3m677s3am5a0pgkk3d0n8qdnehcy2vrpzw2kvwzk44jvp',
    ],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1000)
  @IsString({ each: true })
  addresses: string[];
}
