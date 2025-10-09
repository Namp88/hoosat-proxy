import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsArray, IsNumber, IsString, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Transaction input DTO
 */
class TransactionInputDto {
  @ApiProperty({
    description: 'Previous outpoint',
    example: {
      transactionId: 'abc123...',
      index: 0,
    },
  })
  @IsObject()
  previousOutpoint: {
    transactionId: string;
    index: number;
  };

  @ApiProperty({
    description: 'Signature script (hex)',
    example: '41abc123...',
  })
  @IsString()
  signatureScript: string;

  @ApiProperty({
    description: 'Sequence',
    example: '0',
  })
  @IsString()
  sequence: string;

  @ApiProperty({
    description: 'Signature operation count',
    example: 1,
  })
  @IsNumber()
  sigOpCount: number;
}

/**
 * Transaction output DTO
 */
class TransactionOutputDto {
  @ApiProperty({
    description: 'Amount in sompi',
    example: '100000000',
  })
  @IsString()
  amount: string;

  @ApiProperty({
    description: 'Script public key',
    example: {
      scriptPublicKey: '21abc123...ab',
      version: 0,
    },
  })
  @IsObject()
  scriptPublicKey: {
    scriptPublicKey: string;
    version: number;
  };
}

/**
 * DTO for submitting a transaction
 */
export class SubmitTransactionDto {
  @ApiProperty({
    description: 'Transaction version',
    example: 0,
  })
  @IsNumber()
  version: number;

  @ApiProperty({
    description: 'Transaction inputs',
    type: [TransactionInputDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionInputDto)
  inputs: TransactionInputDto[];

  @ApiProperty({
    description: 'Transaction outputs',
    type: [TransactionOutputDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionOutputDto)
  outputs: TransactionOutputDto[];

  @ApiProperty({
    description: 'Lock time',
    example: '0',
  })
  @IsString()
  lockTime: string;

  @ApiProperty({
    description: 'Subnetwork ID (hex)',
    example: '0000000000000000000000000000000000000000',
  })
  @IsString()
  subnetworkId: string;

  @ApiProperty({
    description: 'Gas',
    example: '0',
  })
  @IsString()
  gas: string;

  @ApiProperty({
    description: 'Payload (hex)',
    example: '',
  })
  @IsString()
  payload: string;

  @ApiPropertyOptional({
    description: 'Allow orphan transactions',
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  allowOrphan?: boolean = false;
}
