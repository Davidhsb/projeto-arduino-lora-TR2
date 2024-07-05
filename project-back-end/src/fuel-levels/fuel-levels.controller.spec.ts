import { Test, TestingModule } from '@nestjs/testing';
import { FuelLevelsController } from './fuel-levels.controller';
import { FuelLevelsService } from './fuel-levels.service';

describe('FuelLevelsController', () => {
  let controller: FuelLevelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelLevelsController],
      providers: [FuelLevelsService],
    }).compile();

    controller = module.get<FuelLevelsController>(FuelLevelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
