import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';

describe('OnboardingController', () => {
  let controller: OnboardingController;
  let service: OnboardingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnboardingController],
      providers: [
        {
          provide: OnboardingService,
          useValue: {
            create: jest.fn().mockReturnValue({
              requestId: '123',
              message: 'Success',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<OnboardingController>(OnboardingController);
    service = module.get<OnboardingService>(OnboardingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with dto', () => {
      const dto: CreateOnboardingDto = {
        fullName: 'John Doe',
        document: '123',
        email: 'john@example.com',
        recaptchaToken: 'token',
      };
      
      const result = controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ requestId: '123', message: 'Success' });
    });
  });
});
