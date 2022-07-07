import { Test, TestingModule } from '@nestjs/testing';
import { PointRegisterService } from './point-register.service';

describe('PointRegisterService', () => {
  let service: PointRegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointRegisterService],
    }).compile();

    service = module.get<PointRegisterService>(PointRegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
