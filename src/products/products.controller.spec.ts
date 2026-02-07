import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn().mockReturnValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', () => {
      const result = controller.findAll({});
      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should call service with query params', () => {
        controller.findAll({ type: 'ahorro', name: 'test' });
        expect(service.findAll).toHaveBeenCalledWith({ type: 'ahorro', name: 'test' });
    });
  });
});
