import { Injectable } from '@nestjs/common';
import { CreateFuelLevelDto } from './dto/create-fuel-level.dto';
import { UpdateFuelLevelDto } from './dto/update-fuel-level.dto';

@Injectable()
export class FuelLevelsService {
  create(createFuelLevelDto: CreateFuelLevelDto) {
    return 'This action adds a new fuelLevel';
  }

  findAll() {
    return `This action returns all fuelLevels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fuelLevel`;
  }

  update(id: number, updateFuelLevelDto: UpdateFuelLevelDto) {
    return `This action updates a #${id} fuelLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} fuelLevel`;
  }
}
