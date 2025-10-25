import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

/**
 * Calculate Minimum Fee Request DTO
 */
export class CalculateMinFeeDto {
  @ApiProperty({
    description: 'Sender address to calculate fee for (will fetch UTXOs automatically)',
    example: 'hoosat:qz7ulu8z6sj9m7pdwm0g4tyjd3j2pycnf2q9nly9zmvnr6uqxdv4jqqruch02',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Number of transaction inputs (manual mode)',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  inputs?: number;

  @ApiProperty({
    description: 'Number of transaction outputs (manual mode)',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  outputs?: number;

  @ApiProperty({
    description: 'Payload size in bytes (optional, for future subnetwork usage)',
    example: 0,
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  payloadSize?: number;
}

/**
 * Calculate Minimum Fee Response DTO
 */
export class CalculateMinFeeResponseDto {
  @ApiProperty({
    description: 'Minimum fee in sompi',
    example: '6653',
  })
  minFee: string;

  @ApiProperty({
    description: 'Number of inputs used in calculation',
    example: 5,
  })
  inputs: number;

  @ApiProperty({
    description: 'Number of outputs used in calculation',
    example: 2,
  })
  outputs: number;

  @ApiProperty({
    description: 'Payload size in bytes',
    example: 0,
  })
  payloadSize: number;

  @ApiProperty({
    description: 'Calculation method: "automatic" or "manual"',
    example: 'automatic',
  })
  method: 'automatic' | 'manual';
}
