import { ApiProperty } from '@nestjs/swagger';

/**
 * Transaction status type enum
 */
export enum TransactionStatusType {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  NOT_FOUND = 'NOT_FOUND',
}

/**
 * Transaction status details DTO
 */
export class TransactionStatusDetailsDto {
  @ApiProperty({
    description: 'Transaction ID',
    example: 'abc123def456...',
  })
  txId: string;

  @ApiProperty({
    description: 'Whether transaction is in mempool',
    example: true,
    required: false,
  })
  inMempool?: boolean;

  @ApiProperty({
    description: 'Whether transaction is orphan (PENDING only)',
    example: false,
    required: false,
  })
  isOrphan?: boolean;

  @ApiProperty({
    description: 'Transaction fee in sompi (PENDING only)',
    example: '1000000',
    required: false,
  })
  fee?: string;

  @ApiProperty({
    description: 'Transaction mass in bytes (PENDING only)',
    example: '250',
    required: false,
  })
  mass?: string;

  @ApiProperty({
    description: 'Block DAA score where transaction was confirmed (CONFIRMED only)',
    example: '123456',
    required: false,
  })
  blockDaaScore?: string;

  @ApiProperty({
    description: 'Amount of confirmed UTXO in sompi (CONFIRMED only)',
    example: '50000000',
    required: false,
  })
  confirmedAmount?: string;

  @ApiProperty({
    description: 'Address where confirmed UTXO was found (CONFIRMED only)',
    example: 'hoosat:qzrecipient456...',
    required: false,
  })
  confirmedAddress?: string;

  @ApiProperty({
    description: 'Whether this is a coinbase transaction (CONFIRMED only)',
    example: false,
    required: false,
  })
  isCoinbase?: boolean;

  @ApiProperty({
    description: 'Human-readable status message',
    example: 'Transaction is in mempool, waiting for confirmation',
    required: false,
  })
  message?: string;
}

/**
 * Transaction status response DTO
 */
export class TransactionStatusResponseDto {
  @ApiProperty({
    description: 'Current status of the transaction',
    enum: TransactionStatusType,
    example: TransactionStatusType.PENDING,
  })
  status: TransactionStatusType;

  @ApiProperty({
    description: 'Detailed information about the transaction status',
    type: TransactionStatusDetailsDto,
  })
  details: TransactionStatusDetailsDto;
}
