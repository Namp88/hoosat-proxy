import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length, IsOptional, IsBoolean, IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * DTO for getting mempool entry by transaction ID
 */
export class GetMempoolEntryDto {
  @ApiProperty({
    description: 'Transaction ID (64 hex characters)',
    example: 'abc123def456789012345678901234567890123456789012345678901234abcd',
  })
  @IsString()
  @Length(64, 64)
  txId: string;

  @ApiPropertyOptional({
    description: 'Include orphan pool transactions',
    default: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  includeOrphanPool?: boolean = true;

  @ApiPropertyOptional({
    description: 'Filter transaction pool',
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  filterTransactionPool?: boolean = false;
}

/**
 * DTO for getting all mempool entries
 */
export class GetMempoolEntriesDto {
  @ApiPropertyOptional({
    description: 'Include orphan pool transactions',
    default: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  includeOrphanPool?: boolean = true;

  @ApiPropertyOptional({
    description: 'Filter transaction pool',
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  filterTransactionPool?: boolean = false;
}

/**
 * DTO for getting mempool entries by addresses
 */
export class GetMempoolEntriesByAddressesDto {
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

  @ApiPropertyOptional({
    description: 'Include orphan pool transactions',
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  includeOrphanPool?: boolean = false;

  @ApiPropertyOptional({
    description: 'Filter transaction pool',
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  filterTransactionPool?: boolean = false;
}
