import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductLikeService } from './product-like.service';
import { CreateProductLikeDto } from './dto/create-product-like.dto';
import { UpdateProductLikeDto } from './dto/update-product-like.dto';

@Controller('product-like')
export class ProductLikeController {
  constructor(private readonly productLikeService: ProductLikeService) {}

  @Post()
  create(@Body() createProductLikeDto: CreateProductLikeDto) {
    return this.productLikeService.create(createProductLikeDto);
  }

  @Get()
  findAll() {
    return this.productLikeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productLikeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductLikeDto: UpdateProductLikeDto) {
    return this.productLikeService.update(+id, updateProductLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productLikeService.remove(+id);
  }
}
