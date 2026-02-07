import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OnboardingService {
  create(dto: CreateOnboardingDto) {
    if (!dto.recaptchaToken) {
      throw new BadRequestException('Recaptcha token is required');
    }

    // In a real app, we would save to DB here.
    const requestId = uuidv4();

    return {
      requestId,
      message: 'Onboarding process started successfully',
    };
  }
}
