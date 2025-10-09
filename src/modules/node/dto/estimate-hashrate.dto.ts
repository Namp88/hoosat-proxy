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
    minimum: 1000,
    maximum: 10000,
  })
  @IsInt()
  @Min(1000)
  @Max(10000)
  @Type(() => Number)
  windowSize: number = 1000;

  @ApiPropertyOptional({
    description: 'Starting block hash (64 hex characters)',
    example: '840309673af21c5b31a6ccdd579299abcb5665a042b0bfb624c08d99222c9d0e',
  })
  @IsOptional()
  @IsString()
  @Length(64, 64)
  startHash?: string;
}
