import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTankDto } from './dto/create-tank.dto';
import { UpdateTankDto } from './dto/update-tank.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TanksService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateTankDto) {
    await this.prisma.tank
      .create({
        data: {
          ...data,
        },
      })
      .catch((err) => {
        if (err instanceof PrismaClientKnownRequestError) {
          throw new BadRequestException('Erro ao criar season');
        }
        throw err;
      });

    return 'Tanque criado com sucesso';
  }

  async findAll() {
    return await this.prisma.tank
      .findMany({
        select: {
          id: true,
          name: true,
          description: true,
          area: true,
          location: true,
        },
        where: {
          is_active: true,
        },
      })
      .catch((err) => {
        if (err instanceof PrismaClientKnownRequestError) {
          throw new BadRequestException('Erro ao buscar seasons');
        }
        throw err;
      });
  }

  async findOne(id: number) {
    return await this.prisma.tank
      .findUnique({
        where: {
          id: id,
          is_active: true,
        },
        select: {
          name: true,
          description: true,
          area: true,
          location: true,
        },
      })
      .catch((err) => {
        if (err instanceof PrismaClientKnownRequestError) {
          throw new BadRequestException('Erro ao buscar season');
        }
        throw err;
      });
  }

  update(id: number, updateTankDto: UpdateTankDto) {
    return `This action updates a #${id} tank`;
  }

  remove(id: number) {
    return `This action removes a #${id} tank`;
  }
}
