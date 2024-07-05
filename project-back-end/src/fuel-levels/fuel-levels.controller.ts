import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuelLevelsService } from './fuel-levels.service';
import { CreateFuelLevelDto } from './dto/create-fuel-level.dto';
import { UpdateFuelLevelDto } from './dto/update-fuel-level.dto';

@Controller('fuel-levels')
export class FuelLevelsController {
  constructor(private readonly fuelLevelsService: FuelLevelsService) {}

  @Post()
  create(@Body() createFuelLevelDto: CreateFuelLevelDto) {
    return this.fuelLevelsService.create(createFuelLevelDto);
  }

  @Get()
  findAll() {
    return this.fuelLevelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fuelLevelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuelLevelDto: UpdateFuelLevelDto) {
    return this.fuelLevelsService.update(+id, updateFuelLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fuelLevelsService.remove(+id);
  }
}
