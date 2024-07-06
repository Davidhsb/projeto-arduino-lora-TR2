import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TanksService } from './tanks.service';
import { CreateTankDto } from './dto/create-tank.dto';
import { UpdateTankDto } from './dto/update-tank.dto';

@Controller('tanks')
export class TanksController {
  constructor(private readonly tanksService: TanksService) {}

  @Post()
  create(@Body() data: CreateTankDto) {
    return this.tanksService.create(data);
  }

  @Get()
  findAll() {
    return this.tanksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tanksService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTankDto: UpdateTankDto) {
  //   return this.tanksService.update(+id, updateTankDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tanksService.remove(+id);
  // }
}
