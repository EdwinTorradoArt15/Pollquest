import { Test, TestingModule } from '@nestjs/testing';
import { CuestionariosController } from './cuestionarios.controller';
import { CuestionariosService } from './cuestionarios.service';

describe('CuestionariosController', () => {
  let controller: CuestionariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuestionariosController],
      providers: [CuestionariosService],
    }).compile();

    controller = module.get<CuestionariosController>(CuestionariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
