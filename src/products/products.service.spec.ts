import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = await service.findAll({});
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
      expect(products[0]).toHaveProperty('id');
      expect(products[0]).toHaveProperty('name');
    });

    it('should filter by type', async () => {
      const savingsProducts = await service.findAll({ type: 'ahorro' });
      expect(savingsProducts.every(p => p.type === 'ahorro')).toBe(true);
    });

    it('should search by name', async () => {
      const allProducts = await service.findAll({});
      const firstProductName = allProducts[0].name;
      const searchResults = await service.findAll({ name: firstProductName });
      expect(searchResults.length).toBeGreaterThan(0);
      expect(searchResults[0].name).toContain(firstProductName);
    });
  });
});
