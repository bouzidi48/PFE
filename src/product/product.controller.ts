import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindByNameProductDto } from './dto/find-by-name-product.dto';
import { FindByCategorieDto } from './dto/find-by-categorie.dto';
import { RemoveProductDto } from './dto/remove-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  create(@Session() request:Record<string, any>,@Body() createProductDto: CreateProductDto) {
    return this.productService.create(request,createProductDto);
  }

  @Get('all')
  findAll() {
    return this.productService.findAll();
  }
  @Get('findbyCategory')
  findByCategory(@Body() findByCategory: FindByCategorieDto) {
    return this.productService.findByCategory(findByCategory);
  }
  @Get('findbyNameProduct')
  findByNameProduct(@Body() nameProduct: FindByNameProductDto) {
    return this.productService.findByNameProduct(nameProduct);
  }

  @Put('update')
  update(@Session() request:Record<string, any>, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(request,updateProductDto);
  }

  @Delete('delete')
  remove(@Session() request:Record<string, any>, @Body() updateProductDto: RemoveProductDto) {
    return this.productService.remove(request,updateProductDto);
  }
}
