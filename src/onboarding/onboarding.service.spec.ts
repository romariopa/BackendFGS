import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingService } from './onboarding.service';
import { BadRequestException } from '@nestjs/common';

describe('OnboardingService', () => {
  let service: OnboardingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnboardingService],
    }).compile();

    service = module.get<OnboardingService>(OnboardingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create onboarding successfully with valid token', () => {
      const result = service.create({
        fullName: 'Test User',
        document: '123456789',
        email: 'test@example.com',
        recaptchaToken: 'some-token',
      });

      expect(result).toHaveProperty('requestId');
      expect(result.message).toBe('Onboarding process started successfully');
    });

    it('should throw BadRequestException if token is missing', () => {
      expect(() => {
        service.create({
          fullName: 'Test User',
          document: '123456789',
          email: 'test@example.com',
          recaptchaToken: '',
        });
      }).toThrow(BadRequestException);
    });
  });
});
