import { HttpStatus, Injectable, NotFoundException, Session } from '@nestjs/common';
import { CreateCouleurDto } from './dto/create-couleur.dto';
import { UpdateCouleurDto } from './dto/update-couleur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Couleur } from './entities/couleur.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { CouleurRepository } from './couleur.repository';
import { Roles } from 'src/enum/user_enum';
import { FindByProductDto } from './dto/find-by-product.dto';

@Injectable()
export class CouleurService {
  constructor(@InjectRepository(Couleur) private readonly couleurRepository:CouleurRepository,
  private readonly userService:UserService,
  private readonly productService:ProductService,
  ){}
  async create(@Session() request:Record<string, any>,createCouleurDto: CreateCouleurDto) {
    const idAdmin=request.idUser
    console.log(idAdmin)
    if(!idAdmin){
      return await {
        message: 'vous devez vous connecter pour ajouter une categorie',
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
    const couleur1=await this.couleurRepository.findOne({where : {nameCouleur:createCouleurDto.nameCouleur}});
    console.log(couleur1)
    if(couleur1) {
      return await{
        message:'cette couleur existe deja',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    const product=await this.productService.findByIdAndNameProduct({id:idAdmin,nameProduct:createCouleurDto.nameProduct})
    if(!product) {
      return await{
        message:'ce produit n\'existe pas',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }

    const couleur=await this.couleurRepository.create(createCouleurDto);
    couleur.addedBy=admin.data;
    couleur.createdate=new Date();
    couleur.product=product.data;
    this.couleurRepository.save(couleur);
    return await {
      message: 'couleur ajoute avec succes',
      statusCode: HttpStatus.OK,
    }

  }

  async findAll() {
    const couleur = await this.couleurRepository.find();
    if(!couleur) {
      return await{
        message:'aucun produit n\'existe',
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
    if(!product) throw new NotFoundException('product not found ')
    
    const couleurs = await this.couleurRepository.find( { where: { product: { id: product.data.id } }});
    if(!couleurs) throw new NotFoundException('couleurs not found ')
      return couleurs;
  }

  async findOne(id: number) {
    const couleur = await this.couleurRepository.findOne({where : {id:id}});
    if(!couleur) throw new NotFoundException('couleur not found ')
      return couleur;
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
        message:'aucun couleur avec ce nom ou vous n\'etes pas l\'admin de ce produit',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    const product = await this.productService.findByNameProduct({nameProduct:updateCouleurDto.nameProduct})
    if(!product) {
      return await{
        message:'le produit que vous avez saisi n\'existe pas',
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
    couleur.updatedate = new Date();
    couleur.product = product.data;
    this.couleurRepository.save(couleur)
    return await {
      message:couleur,
      statusCode:HttpStatus.OK,
    }
  }

  remove(id: number) {
    return `This action removes a #${id} couleur`;
  }
}
