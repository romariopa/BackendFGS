import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOnboardingDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '123456789' })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({ example: 'juan.perez@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'OK', description: 'Must be "OK" to simulate success' })
  @IsString()
  @IsNotEmpty()
  recaptchaToken: string;
}
