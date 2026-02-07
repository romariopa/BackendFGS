import { Body, Controller, Post } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Onboarding')
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post()
  @ApiOperation({ summary: 'Start onboarding process' })
  @ApiResponse({ status: 201, description: 'Onboarding initiated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data or recaptcha token' })
  create(@Body() createOnboardingDto: CreateOnboardingDto) {
    return this.onboardingService.create(createOnboardingDto);
  }
}
