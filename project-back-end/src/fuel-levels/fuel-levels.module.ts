import { Module } from '@nestjs/common';
import { FuelLevelsService } from './fuel-levels.service';
import { FuelLevelsController } from './fuel-levels.controller';

@Module({
  controllers: [FuelLevelsController],
  providers: [FuelLevelsService],
})
export class FuelLevelsModule {}
