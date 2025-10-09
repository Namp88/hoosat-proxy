import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Min, Max, IsOptional, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO for estimating network hashrate
 */
export class EstimateHashrateDto {
  @ApiPropertyOptional({
    description: 'Number of blocks to analyze',
    default: 1000,
    minimum: 1,
    maximum: 10000,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10000)
  @Type(() => Number)
  windowSize?: number = 1000;

  @ApiPropertyOptional({
    description: 'Starting block hash (64 hex characters)',
    example: 'a1b2c3d4e5f6789012345678901234567890123456789012345678901234abcd',
  })
  @IsOptional()
  @IsString()
  @Length(64, 64)
  startHash?: string;
}
