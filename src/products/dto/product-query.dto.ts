import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductQueryDto {
  @ApiPropertyOptional({ description: 'Filter by product name (partial match)' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Filter by product type (exact match)' })
  @IsOptional()
  @IsString()
  type?: string;
}
