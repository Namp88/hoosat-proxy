import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

/**
 * DTO for getting transaction status
 */
export class GetTransactionStatusDto {
  @ApiProperty({
    description: 'Sender address (Hoosat address format)',
    example: 'hoosat:qzsender123...',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^hoosat(test)?:[a-z0-9]+$/, {
    message: 'Invalid sender address format',
  })
  senderAddress: string;

  @ApiProperty({
    description: 'Recipient address (Hoosat address format)',
    example: 'hoosat:qzrecipient456...',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^hoosat(test)?:[a-z0-9]+$/, {
    message: 'Invalid recipient address format',
  })
  recipientAddress: string;
}
