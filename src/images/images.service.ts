import { HttpStatus, Injectable, Session } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';
import { UserService } from 'src/user/user.service';
import { CouleurService } from 'src/couleur/couleur.service';
import { Roles } from 'src/enum/user_enum';
import { FindByImageDto } from './dto/find-by-Image.dto';
import { FindByCouleurDto } from './dto/find-by-couleur.dto';
import { FindByIdNameDto } from './dto/find-by-Id-Name.dto';
import { RemoveImageDto } from './dto/remove-image.dto';
import { Images } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(@InjectRepository(Images) private readonly imageRepository:ImageRepository,
  private readonly userService:UserService,
  private readonly couleurService:CouleurService,
  ){}
  async create(@Session() request:Record<string, any>,createImageDto: CreateImageDto) {
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
    const image1=await this.imageRepository.findOne({where : {UrlImage:createImageDto.UrlImage,couleur:{nameCouleur:createImageDto.nameCouleur}}});
    console.log(image1)
    if(image1) {
      return await{
        message:'cette image existe deja dans se produit',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    const couleur =await this.couleurService.findByNameAndId({id:idAdmin,nameCouleur:createImageDto.nameCouleur})
    if(!couleur) {
      return await{
        message:'cette couleur n\'existe pas ou vous n\'etes pas l\'admin de ce produit',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }

    const image=await this.imageRepository.create(createImageDto);
    image.addedBy=admin.data;
    image.createdate=new Date();
    image.couleur=couleur.data;
    this.imageRepository.save(image);
    return await {
      message: 'couleur ajoute avec succes',
      statusCode: HttpStatus.OK,
    }
  }

  async findAll() {
    const image = await this.imageRepository.find();
    if(image.length==0) {
      return await{
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      message:image,
      statusCode:HttpStatus.OK,
    }
  }

  async findByNameImage(url:FindByImageDto) {
    const image =  await this.imageRepository.find({where : {UrlImage:url.urlImage}});
    if(image.length==0) {
      return await{
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      message:image,
      statusCode:HttpStatus.OK,
    }
  }

  async findByCouleur(nameCategory:FindByCouleurDto) {
    const couleur = await this.couleurService.findByNameCouleur({nameCouleur:nameCategory.nameCouleur})
    if(!couleur) {
      return await{
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    
    const images = await this.imageRepository.find( { where: { couleur: { id: couleur.data.id } }});
    if(images.length==0) {
      return await{
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      message:images,
      statusCode:HttpStatus.OK,
    }
  }

  async findByNameAndId(nameProduct:FindByIdNameDto) {
    const image =  await this.imageRepository.findOne({where : {UrlImage:nameProduct.urlImage,addedBy:{id:nameProduct.id}}});
    if(!image) {
      return await{
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      data:image,
      statusCode:HttpStatus.OK,
    }
  }

  async findOne(id: number) {
    const image = await this.imageRepository.findOne({where : {id:id}});
    if(!image) {
      return await{
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      message:image,
      statusCode:HttpStatus.OK,
    }
  }

  async update(@Session() request:Record<string, any>, updateCouleurDto: UpdateImageDto) {
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
    const image = await this.imageRepository.findOne({where : {UrlImage:updateCouleurDto.urlImage,addedBy:idAdmin}});
    if(!image) {
      return await{
        message:'aucun size avec ce nom ou vous n\'etes pas l\'admin de cette size',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    const couleur = await this.couleurService.findByNameAndId({id:idAdmin,nameCouleur:updateCouleurDto.nameCouleur})
    if(!couleur) {
      return await{
        message:'l couleur que vous avez saisi n\'existe pas ou vous n\'etes pas l\'admin de ce couleur',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    if(updateCouleurDto.urlImage) {
      const ima = await this.imageRepository.findOne({where : {UrlImage:updateCouleurDto.urlImage}});
      if(ima) {
        return await{
          message:'cette couleur existe deja',
          statusCode:HttpStatus.BAD_REQUEST,
        }
      }
    }
    image.UrlImage = updateCouleurDto.urlImage;
    image.addedBy = admin.data;
    image.updatedate = new Date();
    image.couleur = couleur.data;
    this.imageRepository.save(image)
    return await {
      message:image,
      statusCode:HttpStatus.OK,
    }
  }

  async remove(@Session() request:Record<string, any>, removeCouleurDto: RemoveImageDto) {
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
    const image = await this.imageRepository.findOne({where : {UrlImage:removeCouleurDto.urlImage,addedBy:idAdmin}});
    if(!image) {
      return await{
        message:'aucune couleur avec ce nom ou vous n\'etes pas l\'admin de ce produit',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    await this.imageRepository.remove(image)
    return await {
      message:'la couleur a bien ete supprimer',
      statusCode:HttpStatus.OK,
    }
  }
}
