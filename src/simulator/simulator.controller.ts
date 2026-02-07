import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SimulatorService } from './simulator.service';
import { CalculateSimulationDto } from './dto/calculate-simulation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimulationResult } from './entities/simulation-result.entity';

@ApiTags('Simulator')
@Controller('simulator')
export class SimulatorController {
  constructor(private readonly simulatorService: SimulatorService) {}

  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calculate savings simulation' })
  @ApiResponse({ status: 200, description: 'Calculation successful', type: SimulationResult })
  @ApiResponse({ status: 400, description: 'Validation error' })
  calculate(@Body() calculateSimulationDto: CalculateSimulationDto) {
    return this.simulatorService.calculate(calculateSimulationDto);
  }
}
