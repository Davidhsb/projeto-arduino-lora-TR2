import { PickType } from "@nestjs/mapped-types";
import { FuelLevelEntity } from "../entities";

export class CreateFuelLevelDto extends PickType(FuelLevelEntity, [
  'level',
  'tank_id',
]){}
