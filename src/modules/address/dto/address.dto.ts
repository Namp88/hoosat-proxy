import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ArrayMinSize, ArrayMaxSize } from 'class-validator';

/**
 * DTO for operations with multiple addresses
 */
export class AddressesDto {
  @ApiProperty({
    description: 'Array of Hoosat addresses (max 1000)',
    example: [
      'hoosat:qz7ulu8mmmul6hdcnssmjnt28h2xfer8dz9nfqamvvh86ngef4q8dvzxcjdqe',
      'hoosat:qyp4ka9p6mlc2gfrd08m5zau9q4jt4mj93k3gnq9f0x4zcwglmqkgxgjhqk7g',
    ],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1000)
  @IsString({ each: true })
  addresses: string[];
}
