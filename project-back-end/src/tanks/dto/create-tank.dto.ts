import { PickType } from '@nestjs/mapped-types';
import { TankEntity } from '../entities/tank.entity';

export class CreateTankDto extends PickType(TankEntity, [
  'name',
  'description',
  'area',
  'location',
  'is_active',
]) {}
