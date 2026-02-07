import { IsInt, IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CalculateSimulationDto {
  @ApiProperty({ description: 'Initial amount to start the savings', minimum: 0, example: 1000000 })
  @IsNumber()
  @Min(0)
  initialAmount: number;

  @ApiProperty({ description: 'Monthly contribution amount', minimum: 0, example: 200000 })
  @IsNumber()
  @Min(0)
  monthlyContribution: number;

  @ApiProperty({ description: 'Duration in months', minimum: 1, maximum: 360, example: 12 })
  @IsInt()
  @Min(1)
  @Max(360) // 30 years limit
  months: number;

  @ApiPropertyOptional({ description: 'Annual Interest Rate (Effective Annual) in decimal (e.g., 0.05 for 5%). Defaults to 0.05', example: 0.12, default: 0.05 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1) // Max 100%
  rate?: number;
}
