import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of savings products' })
  @ApiResponse({ status: 200, description: 'Return all products or filtered list.', type: [Product] })
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }
}
