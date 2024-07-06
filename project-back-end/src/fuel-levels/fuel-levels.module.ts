import { Module } from '@nestjs/common';
import { FuelLevelsService } from './fuel-levels.service';
import { FuelLevelsController } from './fuel-levels.controller';
import { Prisma } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [FuelLevelsController],
  providers: [FuelLevelsService],
  exports: [FuelLevelsService],
  imports: [PrismaModule],
})
export class FuelLevelsModule {}
