import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FuelLevelsService } from './fuel-levels.service';
import { CreateFuelLevelDto } from './dto/create-fuel-level.dto';
import { UpdateFuelLevelDto } from './dto/update-fuel-level.dto';

@Controller('fuel-levels')
export class FuelLevelsController {
  constructor(private readonly fuelLevelsService: FuelLevelsService) {}

  @Post()
  create(@Body() data: CreateFuelLevelDto) {
    return this.fuelLevelsService.create(data);
  }

  @Get()
  findAll() {
    return this.fuelLevelsService.findAll();
  }

  @Get(':tank_id')
  findMostRecent(@Param('tank_id', ParseIntPipe) tank_id: number) {
    return this.fuelLevelsService.findMostRecent(tank_id);
  }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateFuelLevelDto: UpdateFuelLevelDto) {
//     return this.fuelLevelsService.update(+id, updateFuelLevelDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.fuelLevelsService.remove(+id);
//   }
}
