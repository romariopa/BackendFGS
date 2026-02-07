import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { SimulatorModule } from './simulator/simulator.module';
import { OnboardingModule } from './onboarding/onboarding.module';

@Module({
  imports: [
    ProductsModule,
    SimulatorModule,
    OnboardingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
