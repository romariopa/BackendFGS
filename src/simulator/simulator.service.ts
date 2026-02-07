import { Injectable } from '@nestjs/common';
import { CalculateSimulationDto } from './dto/calculate-simulation.dto';
import { SimulationResult } from './entities/simulation-result.entity';

@Injectable()
export class SimulatorService {
  calculate(dto: CalculateSimulationDto): SimulationResult {
    const { initialAmount, monthlyContribution, months, rate = 0.05 } = dto;

    // Convert Effective Annual Rate (EA) to Monthly Nominal Rate
    // Formula: (1 + EA)^(1/12) - 1
    const monthlyRate = Math.pow(1 + rate, 1 / 12) - 1;

    let currentAmount = initialAmount;
    let totalContributed = initialAmount;

    // Calculate month by month for accuracy with contributions
    // Alternatively, use Future Value formula:
    // FV = P * (1+r)^n + PMT * [ ((1+r)^n - 1) / r ]
    
    // Using Formula:
    const fvInitial = initialAmount * Math.pow(1 + monthlyRate, months);
    
    let fvContributions = 0;
    if (monthlyRate > 0) {
        fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
        fvContributions = monthlyContribution * months;
    }

    const finalBalance = fvInitial + fvContributions;
    
    // Total contributed is initial + (monthly * months)
    totalContributed = initialAmount + (monthlyContribution * months);
    
    const interestEarned = finalBalance - totalContributed;

    return {
      totalContributed: Math.round(totalContributed * 100) / 100,
      interestEarned: Math.round(interestEarned * 100) / 100,
      finalBalance: Math.round(finalBalance * 100) / 100,
    };
  }
}
