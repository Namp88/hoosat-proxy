import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * DTO for getting a single block by hash
 */
export class GetBlockDto {
  @ApiProperty({
    description: 'Block hash (64 hex characters)',
    example: 'a1b2c3d4e5f6789012345678901234567890123456789012345678901234abcd',
  })
  @IsString()
  @Length(64, 64)
  hash: string;

  @ApiPropertyOptional({
    description: 'Include full transaction data in response',
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
  includeTransactions?: boolean = true;
}

/**
 * DTO for getting multiple blocks
 */
export class GetBlocksDto {
  @ApiProperty({
    description: 'Starting block hash (64 hex characters)',
    example: 'a1b2c3d4e5f6789012345678901234567890123456789012345678901234abcd',
  })
  @IsString()
  @Length(64, 64)
  lowHash: string;

  @ApiPropertyOptional({
    description: 'Include full transaction data in response',
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
  includeTransactions?: boolean = false;
}
