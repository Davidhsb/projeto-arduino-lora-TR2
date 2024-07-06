import { Module } from '@nestjs/common';
import { TanksService } from './tanks.service';
import { TanksController } from './tanks.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [TanksController],
  providers: [TanksService],
  exports: [TanksService],
  imports: [PrismaModule],
})
export class TanksModule {}
