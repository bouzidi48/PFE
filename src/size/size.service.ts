import { HttpStatus, Injectable, Session } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';
import { SizeRepository } from './size.repository';
import { UserService } from 'src/user/user.service';
import { CouleurService } from 'src/couleur/couleur.service';
import { Roles } from 'src/enum/user_enum';

@Injectable()
export class SizeService {
  constructor(@InjectRepository(Size) private readonly sizeRepository:SizeRepository,
  private readonly userService:UserService,
  private readonly couleurService:CouleurService,
  ){}
  async create(@Session() request:Record<string, any>,createSizeDto: CreateSizeDto) {
    /*const idAdmin=request.idUser
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
    const size1=await this.sizeRepository.findOne({where : {typeSize:createSizeDto.typeSize}});
    console.log(size1)
    if(size1) {
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
    }*/
  }

  findAll() {
    return `This action returns all size`;
  }

  findOne(id: number) {
    return `This action returns a #${id} size`;
  }

  update(id: number, updateSizeDto: UpdateSizeDto) {
    return `This action updates a #${id} size`;
  }

  remove(id: number) {
    return `This action removes a #${id} size`;
  }
}
