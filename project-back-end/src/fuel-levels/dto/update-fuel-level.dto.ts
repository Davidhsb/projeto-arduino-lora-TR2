import { PartialType } from '@nestjs/mapped-types';
import { CreateFuelLevelDto } from './create-fuel-level.dto';

export class UpdateFuelLevelDto extends PartialType(CreateFuelLevelDto) {}
