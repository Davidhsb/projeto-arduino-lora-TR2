import { Test, TestingModule } from '@nestjs/testing';
import { FuelLevelsService } from './fuel-levels.service';

describe('FuelLevelsService', () => {
  let service: FuelLevelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuelLevelsService],
    }).compile();

    service = module.get<FuelLevelsService>(FuelLevelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
