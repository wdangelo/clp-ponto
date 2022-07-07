import { Test, TestingModule } from '@nestjs/testing';
import { PointRegisterController } from './point-register.controller';
import { PointRegisterService } from './point-register.service';

describe('PointRegisterController', () => {
  let controller: PointRegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointRegisterController],
      providers: [PointRegisterService],
    }).compile();

    controller = module.get<PointRegisterController>(PointRegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
