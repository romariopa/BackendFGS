import { Test, TestingModule } from '@nestjs/testing';
import { SimulatorService } from './simulator.service';

describe('SimulatorService', () => {
  let service: SimulatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulatorService],
    }).compile();

    service = module.get<SimulatorService>(SimulatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculate', () => {
    it('should calculate correct values for simple case', () => {
      const result = service.calculate({
        initialAmount: 1000,
        monthlyContribution: 100,
        months: 12,
        rate: 0.0, // 0% interest for easy calculation
      });

      expect(result.totalContributed).toBe(2200); // 1000 + 12*100
      expect(result.interestEarned).toBe(0);
      expect(result.finalBalance).toBe(2200);
    });

    it('should calculate interest correctly', () => {
      const result = service.calculate({
        initialAmount: 1000,
        monthlyContribution: 0,
        months: 12,
        rate: 0.12, // ~12% EA
      });

      // 1000 * (1 + 0.12)^(1) approx? No, formula uses monthly rate
      // monthlyRate = (1.12)^(1/12) - 1
      // FV = 1000 * (1 + monthlyRate)^12 = 1000 * (1 + 0.12) = 1120
      
      expect(result.totalContributed).toBe(1000);
      expect(result.finalBalance).toBeCloseTo(1120, 0);
      expect(result.interestEarned).toBeCloseTo(120, 0);
    });

    it('should use default rate (0.05) when rate is not provided', () => {
        // Test default rate logic
        const result = service.calculate({
          initialAmount: 1000,
          monthlyContribution: 0,
          months: 12,
          // rate is undefined
        });
  
        // Default rate is 0.05 (5% EA)
        // monthlyRate = (1.05)^(1/12) - 1
        // FV = 1000 * (1.05) = 1050
        
        expect(result.totalContributed).toBe(1000);
        expect(result.finalBalance).toBeCloseTo(1050, 0);
    });
  });
});
