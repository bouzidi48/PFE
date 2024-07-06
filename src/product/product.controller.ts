import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Put, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindByNameProductDto } from './dto/find-by-name-product.dto';
import { FindByCategorieDto } from './dto/find-by-categorie.dto';
import { RemoveProductDto } from './dto/remove-product.dto';
import { FindByNameAndIdProductDto } from './dto/find-by-name-id-product.dto';
import { AjouetrPanierDto } from './dto/ajouter-panier.dto';
import { get } from 'http';
import { RemovePanierDto } from './dto/remove-panier.to';

@Controller('product')
export class ProductController {
  updateStock1(id: number, quantity: number, arg2: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  create(@Session() request:Record<string, any>,@Body() createProductDto: CreateProductDto) {
    return this.productService.create(request,createProductDto);
  }

  @Get('all')
  findAll() {
    return this.productService.findAll();
  }

  @Get('findbyNameProduct')
  findByNameProduct(@Body() nameProduct: FindByNameProductDto) {
    return this.productService.findByNameProduct(nameProduct);
  }

  @Get('findbyNameAndIdProduct')
  findByNameAndIdProduct(@Body() nameAndIdProduct: FindByNameAndIdProductDto) {
    return this.productService.findByNameAndIdProduct(nameAndIdProduct);
  }

  @Get('findbyCategory')
  findByCategory(@Body() findByCategory: FindByCategorieDto) {
    return this.productService.findByCategory(findByCategory);
  }

  @Put('update')
  update(@Session() request:Record<string, any>, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(request,updateProductDto);
  }
   



  @Delete('delete')
  remove(@Session() request:Record<string, any>, @Body() updateProductDto: RemoveProductDto) {
    return this.productService.remove(request,updateProductDto);
  }
  @Get('findById')
  async findById(@Body() id:number){
    return await  this.productService.findById(id);
  }

  @Post('createPanier')
  async createPanier(@Session() request:Record<string, any>,@Body() createProductDto: AjouetrPanierDto) {
    return await  this.productService.ajouterPanier(request,createProductDto);
  }
  @Get('listePnaier')
  listePanier(@Session() request:Record<string, any>) {
    return this.productService.listePanier(request);
  }
  @Delete('deletePanier')
  removePanier(@Session() request:Record<string, any>,@Body() removePanierDto: RemovePanierDto) {
    return this.productService.removePanier(request,removePanierDto);
  }

  @Patch(':id/stock')
  async updateStock(@Body() id :number ,stock:number,status:string ) {
    
    try {
      const updatedProduct = await this.productService.updateStock(id, stock, status);
      return {
        data: updatedProduct,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

}
