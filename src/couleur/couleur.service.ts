import { forwardRef, HttpStatus, Inject, Injectable, NotFoundException, Session } from '@nestjs/common';
import { CreateCouleurDto } from './dto/create-couleur.dto';
import { UpdateCouleurDto } from './dto/update-couleur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Couleur } from './entities/couleur.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { CouleurRepository } from './couleur.repository';
import { Roles } from 'src/enum/user_enum';
import { FindByProductDto } from './dto/find-by-product.dto';
import { RemoveCouleurDto } from './dto/remove-couleur.dto';
import { FindByCouleurDto } from './dto/find-by-couleur.dto';
import { FindByIdNameDto } from './dto/find-by-Id-Name.dto';
import { UserController } from 'src/user/user.controller';
import { ProductController } from 'src/product/product.controller';
import { SizeService } from 'src/size/size.service';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class CouleurService {
  constructor(@InjectRepository(Couleur) private readonly couleurRepository:CouleurRepository,
   private readonly userService:UserService,
    private readonly productService:ProductService,
    private readonly sizeService:SizeService,
    @Inject(forwardRef(() => ImagesService))
    private readonly imageService:ImagesService
  ){}
  async create(@Session() request:Record<string, any>,createCouleurDto: CreateCouleurDto) {
    const idAdmin=request.idUser
    console.log(idAdmin)
    if(!idAdmin){
      return await {
        message: 'vous devez vous connecter pour ajouter une couleur',
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
    const couleur1=await this.couleurRepository.findOne({where : {nameCouleur:createCouleurDto.nameCouleur,product:{nameProduct:createCouleurDto.nameProduct}}});
    console.log(couleur1)
    if(couleur1) {
      return await{
        message:'cette couleur existe deja dans se produit',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    const product=await this.productService.findByNameAndIdProduct({id:idAdmin,nameProduct:createCouleurDto.nameProduct})
    if(!product) {
      return await{
        message:'ce produit n\'existe pas ou vous n\'etes pas l\'admin de ce produit',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }

    const couleur=await this.couleurRepository.create(createCouleurDto);
    couleur.addedBy=admin.data;
    couleur.createdate=new Date();
    couleur.product=product.data;
    this.couleurRepository.save(couleur);
    for(let image of createCouleurDto.listeimage) {
      await this.imageService.create_product(request,image)
    }
    for(let size of createCouleurDto.listesize) {
      await this.sizeService.create(request,size)
    }
    return await {
      message: 'couleur ajoute avec succes',
      statusCode: HttpStatus.OK,
    }

  }

  async findAll() {
    const couleur = await this.couleurRepository.find();
    if(couleur.length==0) {
      return await{
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      message:couleur,
      statusCode:HttpStatus.OK,
    }
  }

  async findByNameCouleur(nameCouleur:FindByCouleurDto) {
    const couleur =  await this.couleurRepository.find({where : {nameCouleur:nameCouleur.nameCouleur},relations:['images','sizes']});
    if(couleur.length==0) {
      return await{
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      message:couleur,
      statusCode:HttpStatus.OK,
    }
  }

  async findByProduct(nameCategory:FindByProductDto) {
    const product = await this.productService.findByNameProduct({nameProduct:nameCategory.nameProduct})
    if(!product) {
      return await{
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    
    const couleurs = await this.couleurRepository.find( { where: { product: { id: product.data.id } }});
    if(!couleurs) {
      return await{
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      message:couleurs,
      statusCode:HttpStatus.OK,
    }
  }

  async findByNameAndId(nameProduct:FindByIdNameDto) {
    const couleur =  await this.couleurRepository.findOne({where : {nameCouleur:nameProduct.nameCouleur,addedBy:{id:nameProduct.id}}});
    if(!couleur) {
      return await{
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      data:couleur,
      statusCode:HttpStatus.OK,
    }
  }

  async findOne(id: number) {
    const couleur = await this.couleurRepository.findOne({where : {id:id}});
    if(!couleur) {
      return await{
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      data:couleur,
      statusCode:HttpStatus.OK,
    }
  }
  async findByIdCouleurIdProduct(idProduct: number,idCouleur:number) {
    const couleur = await this.couleurRepository.findOne({where:{id:idCouleur,product:{id:idProduct}}});
    if(!couleur) {
      return await{
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      message:couleur,
      statusCode:HttpStatus.OK,
    }
  }

  async update(@Session() request:Record<string, any>, updateCouleurDto: UpdateCouleurDto) {
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
    const couleur = await this.couleurRepository.findOne({where : {nameCouleur:updateCouleurDto.ancienNameCouleur,addedBy:idAdmin}});
    if(!couleur) {
      return await{
        message:'aucun couleur avec ce nom ou vous n\'etes pas l\'admin de cette couleur',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    const product = await this.productService.findByNameAndIdProduct({id:idAdmin,nameProduct:updateCouleurDto.nameProduct})
    if(!product) {
      return await{
        message:'le produit que vous avez saisi n\'existe pas ou vous n\'etes pas l\'admin de ce produit',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    if(updateCouleurDto.nameCouleur) {
      const col = await this.couleurRepository.findOne({where : {nameCouleur:updateCouleurDto.nameCouleur}});
      if(col) {
        return await{
          message:'cette couleur existe deja',
          statusCode:HttpStatus.BAD_REQUEST,
        }
      }
    }
    couleur.nameCouleur = updateCouleurDto.nameCouleur;
    couleur.addedBy = admin.data;
    couleur.updatedate = new Date();
    couleur.product = product.data;
    this.couleurRepository.save(couleur)
    for(let image of updateCouleurDto.listeimage) {
      await this.imageService.update_product(request,image)
    }
    for(let size of updateCouleurDto.listesize) {
      await this.sizeService.update(request,size)
    }
    return await {
      message:couleur,
      statusCode:HttpStatus.OK,
    }
  }

  async remove(@Session() request:Record<string, any>, removeCouleurDto: RemoveCouleurDto) {
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
    const couleur = await this.couleurRepository.findOne({where : {nameCouleur:removeCouleurDto.nameCouleur,addedBy:idAdmin}});
    if(!couleur) {
      return await{
        message:'aucune couleur avec ce nom ou vous n\'etes pas l\'admin de ce produit',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    for(let image of removeCouleurDto.listeimage) {
      await this.imageService.remove_product(request,image)
    }
    for(let size of removeCouleurDto.listesize) {
      await this.sizeService.remove(request,size)
    }
    await this.couleurRepository.remove(couleur)
    return await {
      message:'la couleur a bien ete supprimer',
      statusCode:HttpStatus.OK,
    }
  }
}
