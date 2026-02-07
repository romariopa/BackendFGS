import { Test, TestingModule } from '@nestjs/testing';
import { SimulatorController } from './simulator.controller';
import { SimulatorService } from './simulator.service';
import { CalculateSimulationDto } from './dto/calculate-simulation.dto';

describe('SimulatorController', () => {
  let controller: SimulatorController;
  let service: SimulatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulatorController],
      providers: [
        {
          provide: SimulatorService,
          useValue: {
            calculate: jest.fn().mockReturnValue({
              totalContributed: 0,
              interestEarned: 0,
              finalBalance: 0,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<SimulatorController>(SimulatorController);
    service = module.get<SimulatorService>(SimulatorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('calculate', () => {
    it('should call service.calculate with dto', () => {
      const dto: CalculateSimulationDto = {
        initialAmount: 1000,
        monthlyContribution: 100,
        months: 12,
      };
      
      controller.calculate(dto);
      expect(service.calculate).toHaveBeenCalledWith(dto);
    });
  });
});
