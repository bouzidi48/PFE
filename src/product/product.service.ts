import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { ProductSessionService } from './session/service/productSession.service';
import { UserSessionService } from 'src/user/session/service/userSession.service';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Roles } from 'src/enum/user_enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository:ProductRepository,
    @InjectRepository(User) private userRepository:UserRepository,
    private readonly mailerService:MailerService,
    private readonly productsession: ProductSessionService,
    private readonly usersession : UserSessionService
  ) {}
  async create(createProductDto: CreateProductDto) {
    const id = await this.usersession.session.get('idUser')
    const user = await this.userRepository.findOne({ where : { id : id}});
    if(user.role == Roles.ADMIN) {
      const existingproduct = await this.productRepository.findOne({ where: { nameProduct: createProductDto.nameProduct } });
      if (existingproduct) {
        return await {
          message: 'Erreur product deja existe',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
      const product = await this.productRepository.create({...createProductDto,createdate: new Date()})
      this.productRepository.save(product)
      return await {
        message: 'product ajouter avec succées',
        statusCode: HttpStatus.OK,
      }
    }
    return await {
      message: 'Erreur user Introuvable',
      statusCode: HttpStatus.BAD_REQUEST,
    };
    
  }

  async findAll() {
    const listproduct = await this.productRepository.find()
    if(!listproduct) {
      return await {
        message : 'list Vide',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
    return await {
      data : listproduct,
      statusCode: HttpStatus.OK,
    };
  }

  async findOne(id: number) {
    const listproduct = await this.productRepository.findOne({ where: { id: id } })
    if(!listproduct) {
      return await {
        message : 'list Vide',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
    return await {
      data : listproduct,
      statusCode: HttpStatus.OK,
    };
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
