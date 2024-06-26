import { HttpStatus, Injectable, Session } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { CategoryRepository } from 'src/categories/category.repository';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { Roles } from 'src/enum/user_enum';
import { FindByNameProductDto } from './dto/find-by-name-product.dto';
import { FindByCategorieDto } from './dto/find-by-categorie.dto';
import { RemoveProductDto } from './dto/remove-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(CategoryEntity)private readonly categoryRepository:CategoryRepository,
    @InjectRepository(User) private userRepository:UserRepository,
    @InjectRepository(Product) private readonly productRepository:ProductRepository  
  ){}
  async create(@Session() request:Record<string, any>,createProductDto: CreateProductDto) {
    const idAdmin=request.idUser
    console.log(idAdmin)
    if(!idAdmin){
      return await {
        message: 'vous devez vous connecter pour ajouter une categorie',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    const admin= await this.userRepository.findOne({where : {id:idAdmin}})
    if(!admin || admin.role!=Roles.ADMIN) {
      return await{
        message:'vous devez etre un admin',
        statusCode:HttpStatus.BAD_REQUEST,
      
      }
    }
    const pro = await this.productRepository.findOne({where : {nameProduct:createProductDto.nameProduct}});
    if(pro) {
      return await{
        message:'ce produit existe deja',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    const category=await this.categoryRepository.findOne({where : {nameCategory:createProductDto.nomCategory,addedBy:idAdmin}});
    if(!category) {
      return await{
        message:'la categorie que vous avez saisi n\'existe pas ou vous n\'etes pas l\'admin de cette categorie',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }

    const product=await this.productRepository.create(createProductDto);
    product.addedBy=admin;
    product.category=category;
    product.createdate=new Date();
    this.productRepository.save(product)
    return await {
      message:product,
      statusCode:HttpStatus.OK,
    
    }
  }
  


  async findAll(@Session() request:Record<string, any>) {
    const idUser = request.idUser
    if(!idUser){
      return await {
        message: 'vous devez vous connecter',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    const products = await this.productRepository.find();
    if(!products) {
      return await{
        message:'aucun produit n\'existe',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      message:products,
      statusCode:HttpStatus.OK,
    }
  }
  async findByNameProduct(@Session() request:Record<string, any>,nameProduct:FindByNameProductDto) {
    const idUser = request.idUser
    if(!idUser){
      return await {
        message: 'vous devez vous connecter',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    const products = await this.productRepository.findOne({where : {nameProduct:nameProduct.nameProduct}});
    if(!products) {
      return await{
        message:'aucun produit avec ce nom',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      message:products,
      statusCode:HttpStatus.OK,
    
    }
  }
  async findByCategory(@Session() request:Record<string, any>,nameCategory:FindByCategorieDto) {
    const idUser = request.idUser
    if(!idUser){
      return await {
        message: 'vous devez vous connecter',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    const categorie = await this.categoryRepository.findOne({where : {nameCategory:nameCategory.nameCategory}});
    console.log(categorie)
    if(!categorie) {
      return await{
        message:'la categorie que vous avez saisi n\'existe pas',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    
    const products = await this.productRepository.find( { where: { category: { id: categorie.id } }});
    console.log(products)
    if(!products) {
      return await{
        message:'aucun produit dans cette categorie',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      message: products,
      statusCode: HttpStatus.OK,
    
    }
  }
    


  async update(@Session() request:Record<string, any>, updateProductDto: UpdateProductDto) {
    const idAdmin = request.idUser
    if(!idAdmin){  
      return await {
        message: 'vous devez vous connecter',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    const admin = await this.userRepository.findOne({where : {id:idAdmin}})
    if(!admin || admin.role!=Roles.ADMIN) {
      return await{
        message:'vous devez etre un admin',
        statusCode:HttpStatus.BAD_REQUEST,
      
      }
    }
    const product = await this.productRepository.findOne({where : {nameProduct:updateProductDto.ancienProduct,addedBy:idAdmin}});
    if(!product) {
      return await{
        message:'aucun produit avec ce nom ou vous n\'etes pas l\'admin de ce produit',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    const category = await this.categoryRepository.findOne({where : {nameCategory:updateProductDto.nomCategory}});
    if(!category) {
      return await{
        message:'la categorie que vous avez saisi n\'existe pas',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    if(updateProductDto.nameProduct) {
      const pro = await this.productRepository.findOne({where : {nameProduct:updateProductDto.nameProduct}});
      if(pro) {
        return await{
          message:'ce produit existe deja',
          statusCode:HttpStatus.BAD_REQUEST,
        }
      }
    }
    product.nameProduct = updateProductDto.nameProduct;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
    product.stockQuantity = updateProductDto.stockQuantity;
    product.category = category;
    product.updatedate = new Date();
    this.productRepository.save(product)
    return await {
      message:product,
      statusCode:HttpStatus.OK,
    }
  }
  async remove(@Session() request:Record<string, any>, removeProductDto: RemoveProductDto) {
    const idAdmin = request.idUser
    if(!idAdmin){  
      return await {
        message: 'vous devez vous connecter',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    const admin = await this.userRepository.findOne({where : {id:idAdmin}})
    if(!admin || admin.role!=Roles.ADMIN) {
      return await{
        message:'vous devez etre un admin',
        statusCode:HttpStatus.BAD_REQUEST,
      
      }
    }
    const product = await this.productRepository.findOne({where : {nameProduct:removeProductDto.nameProduct,addedBy:idAdmin}});
    if(!product) {
      return await{
        message:'aucun produit avec ce nom ou vous n\'etes pas l\'admin de ce produit',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    await this.productRepository.remove(product)
    return await {
      message:'le produit a bien ete supprimer',
      statusCode:HttpStatus.OK,
    }
  }
}
