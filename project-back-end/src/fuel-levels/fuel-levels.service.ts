import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFuelLevelDto } from './dto/create-fuel-level.dto';
import { UpdateFuelLevelDto } from './dto/update-fuel-level.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FuelLevelsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateFuelLevelDto) {
    await this.prisma.fuelLevel
      .create({
        data: {
          level: data.level,
          // tank_id: 1,
          tank: {
            connect: {
              id: 1,
            },
          },
        },
      })
      .catch((err) => {
        if (err instanceof PrismaClientKnownRequestError) {
          throw new BadRequestException('Erro ao criar nível');
        }
        throw err;
      });

    return 'Nível registrado com sucesso';
  }

  async findAll() {
    return await this.prisma.fuelLevel
      .findMany({
        select: {
          id: true,
          level: true,
          createdAt: true,
        },
        where: {
          tank_id: 1, // or tank_id: tank_id
        },
      })
      .catch((err) => {
        if (err instanceof PrismaClientKnownRequestError) {
          throw new BadRequestException('Erro ao buscar níveis');
        }
        throw err;
      });
  }

  async findMostRecent(id: number) {
    return await this.prisma.fuelLevel
      .findFirst({
        select: {
          id: true,
          level: true,
          createdAt: true,
        },
        where: {
          tank_id: 1, // or tank_id: tank_id
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      .catch((err) => {
        if (err instanceof PrismaClientKnownRequestError) {
          throw new BadRequestException('Erro ao buscar nível medido');
        }
        throw err;
      });
  }

  update(id: number, updateFuelLevelDto: UpdateFuelLevelDto) {
    return `This action updates a #${id} fuelLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} fuelLevel`;
  }
}
