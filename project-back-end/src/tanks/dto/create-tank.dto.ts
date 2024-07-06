import { PickType } from "@nestjs/mapped-types";
import { TankEntity } from "../entities/tank.entity";

export class CreateTankDto extends PickType(TankEntity, [
  'name',
  'descripition',
  'area',
  'location',
  'is_active',
]){}
