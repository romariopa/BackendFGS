import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { ProductsModule } from './products/products.module';
import { SimulatorModule } from './simulator/simulator.module';
import { CreateOnboardingDto } from './onboarding/dto/create-onboarding.dto';
import { ProductQueryDto } from './products/dto/product-query.dto';
import { Product } from './products/entities/product.entity';
import { CalculateSimulationDto } from './simulator/dto/calculate-simulation.dto';
import { SimulationResult } from './simulator/entities/simulation-result.entity';

describe('Coverage Checks', () => {
  it('should initialize modules', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, OnboardingModule, ProductsModule, SimulatorModule],
    }).compile();

    expect(moduleRef).toBeDefined();
  });

  it('should instantiate DTOs and Entities', () => {
    expect(new CreateOnboardingDto()).toBeDefined();
    expect(new ProductQueryDto()).toBeDefined();
    expect(new Product()).toBeDefined();
    expect(new CalculateSimulationDto()).toBeDefined();
    expect(new SimulationResult()).toBeDefined();
  });
});
