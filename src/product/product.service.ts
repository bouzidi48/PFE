import { HttpStatus, Injectable, NotFoundException, Session } from '@nestjs/common';
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
import { CategoriesService } from 'src/categories/categories.service';
import { UserService } from 'src/user/user.service';
import { FindByNameAndIdProductDto } from './dto/find-by-name-id-product.dto';
import { AjouetrPanierDto } from './dto/ajouter-panier.dto';
import { Couleur } from 'src/couleur/entities/couleur.entity';
import { CouleurRepository } from 'src/couleur/couleur.repository';
import { Size } from 'src/size/entities/size.entity';
import { SizeRepository } from 'src/size/size.repository';
import { RemovePanierDto } from './dto/remove-panier.to';

@Injectable()
export class ProductService {
 
 
  constructor(
    private readonly categoryService:CategoriesService,
    private readonly userService:UserService,
    @InjectRepository(Couleur) private readonly couleurRepository:CouleurRepository,
    @InjectRepository(Size) private readonly sizeRepository:SizeRepository,
    @InjectRepository(Product) private readonly productRepository:ProductRepository  
  ){}
  async create(@Session() request:Record<string, any>,createProductDto: CreateProductDto) {
    const idAdmin=request.idUser
    console.log(idAdmin)
    if(!idAdmin){
      return await {
        message: 'vous devez vous connecter pour ajouter un produit',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    const admin= await this.userService.findById(idAdmin)
    if(!admin || admin.data.role!=Roles.ADMIN) {
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
    const category=await this.categoryService.findByIdAndName({id:idAdmin,nameCategory:createProductDto.nomCategory})
    if(!category) {
      return await{
        message:'la categorie que vous avez saisi n\'existe pas ou vous n\'etes pas l\'admin de cette categorie',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }

    const product=await this.productRepository.create(createProductDto);
    product.addedBy=admin.data;
    product.category=category.data;
    product.createdate=new Date();
    this.productRepository.save(product)
    return await {
      message:'produit ajoute avec succes',
      statusCode:HttpStatus.OK,
    
    }
  }
  


  async findAll() {
    const products = await this.productRepository.find();
    if(!products){
      return await {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
      return await {
        data:products,
        statusCode:HttpStatus.OK,
    }
  }
  async findByNameProduct(nameProduct:FindByNameProductDto) {
    const product = await this.productRepository.findOne({where : {nameProduct:nameProduct.nameProduct}});
    if(!product){
      return  {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
      return  {
        data:product,
        statusCode:HttpStatus.OK,
    }
  }
  async findByIdAndNameProduct(nameProduct:FindByNameAndIdProductDto) {
    const product = await this.productRepository.findOne( { where: { nameProduct: nameProduct.nameProduct,addedBy: { id: nameProduct.id} } });
    if(!product){
      return await {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
      return await {
        data:product,
        statusCode:HttpStatus.OK,
    }
  }
  async findByCategory(nameCategory:FindByCategorieDto) {
    const categorie = await this.categoryService.findByName({nameCategory:nameCategory.nameCategory})
    if(!categorie){
      return await {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    
    const products = await this.productRepository.find( { where: { category: { id: categorie.data.id } }});
    if(!products){
      return await {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      data:products,
      statusCode:HttpStatus.OK,
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
    const admin = await this.userService.findById(idAdmin)
    if(!admin || admin.data.role!=Roles.ADMIN) {
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
    const category = await this.categoryService.findByIdAndName({id:idAdmin,nameCategory:updateProductDto.nomCategory})
    if(!category) {
      return await{
        message:'la categorie que vous avez saisi n\'existe pas ou vous n\'etes pas l\'admin de cette categorie',
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
    product.category = category.data;
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
    const admin = await this.userService.findById(idAdmin)
    if(!admin || admin.data.role!=Roles.ADMIN) {
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
  async findById(id:number){
    const product = await this.productRepository.findOne({where:{id:id}});
    if(!product){
      return await {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      data:product,
      statusCode:HttpStatus.OK,
    }
  }
  async ajouterPanier(@Session() request:Record<string, any>, ajouterPanierDto: AjouetrPanierDto) {
    const productId = ajouterPanierDto.productId
    const couleurId = ajouterPanierDto.couleurId
    const sizeId = ajouterPanierDto.sizeId
    const quantity = ajouterPanierDto.quantity
    if(!request.panier) {
      request.panier =[]
    }
    const product = await this.productRepository.findOne({where:{id:productId}})
    if(!product) {
      return await{
        message:'ce produit n\'existe pas',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    const couleur = await this.couleurRepository.findOne({where:{id:couleurId}})
    if(!couleur) {
      return await{
        message:'ce couleur n\'existe pas',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    const size = await this.sizeRepository.findOne({where:{id:sizeId}})
    if(!size) {
      return await{
        message:'ce taille n\'existe pas',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    for(let i=0;i<request.panier.length;i++) {
      if(request.panier[i].productId==productId && request.panier[i].couleurId==couleurId) {
        request.panier[i].sizeId = sizeId
        request.panier[i].quantity = request.panier[i].quantity+quantity
        request.panier[i].price = request.panier[i].quantity*product.price
        return await {
          message:request.panier,
          statusCode:HttpStatus.OK,
        }
      }
    }
    
      request.panier.push({
        productId:productId,
        couleurId:couleurId,
        sizeId:sizeId,
        quantity:quantity,
        price:quantity*product.price
      })
    
    return await {
      message:request.panier,
      statusCode:HttpStatus.OK,
    

    }
  }
  async listePanier(@Session() request:Record<string, any>) {
    return await {
      data:request.panier,
      statusCode:HttpStatus.OK,
    }
  }


  async removePanier(@Session() request:Record<string, any>, removePanierDto: RemovePanierDto) {
    for(let i=0;i<request.panier.length;i++) {
      if(request.panier[i].productId==removePanierDto.productId && request.panier[i].couleurId==removePanierDto.couleurId) {
        request.panier.splice(i,1)
        return await {
          message:request.panier,
          statusCode:HttpStatus.OK,
        }
      }
    }
    return await {
      message:request.panier,
      statusCode:HttpStatus.OK,

    } 
  }
}
