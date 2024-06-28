import { Test, TestingModule } from '@nestjs/testing';
import { CouleurService } from './couleur.service';

describe('CouleurService', () => {
  let service: CouleurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouleurService],
    }).compile();

    service = module.get<CouleurService>(CouleurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
