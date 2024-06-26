import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindByNameProductDto } from './dto/find-by-name-product.dto';
import { FindByCategorieDto } from './dto/find-by-categorie.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  create(@Session() request:Record<string, any>,@Body() createProductDto: CreateProductDto) {
    return this.productService.create(request,createProductDto);
  }

  @Get('all')
  findAll(@Session() request:Record<string, any>) {
    return this.productService.findAll(request);
  }
  @Get('byCategory')
  findByCategory(@Session() request:Record<string, any>,@Body() findByNameCategory: FindByCategorieDto) {
    return this.productService.findByCategory(request,findByNameCategory);
  }
  @Get('byNameProduct')
  findByNameProduct(@Session() request:Record<string, any>,@Body() nameProduct: FindByNameProductDto) {
    return this.productService.findByNameProduct(request,nameProduct);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
