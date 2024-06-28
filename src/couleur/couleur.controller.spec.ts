import { Test, TestingModule } from '@nestjs/testing';
import { CouleurController } from './couleur.controller';
import { CouleurService } from './couleur.service';

describe('CouleurController', () => {
  let controller: CouleurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouleurController],
      providers: [CouleurService],
    }).compile();

    controller = module.get<CouleurController>(CouleurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
