import { FuelLevel } from '@prisma/client';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class FuelLevelEntity implements FuelLevel {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsNumber()
  @IsNotEmpty()
  tank_id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
