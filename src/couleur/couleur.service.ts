import { Injectable, Session } from '@nestjs/common';
import { CreateCouleurDto } from './dto/create-couleur.dto';
import { UpdateCouleurDto } from './dto/update-couleur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Couleur } from './entities/couleur.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { CouleurRepository } from './couleur.repository';

@Injectable()
export class CouleurService {
  constructor(@InjectRepository(Couleur) private readonly couleurRepository:CouleurRepository,
  private readonly userService:UserService,
  private readonly productService:ProductService
  ){}
  create(@Session() request:Record<string, any>,createCouleurDto: CreateCouleurDto) {
    return "This action adds a new couleur";
  }

  findAll() {
    return `This action returns all couleur`;
  }

  findOne(id: number) {
    return `This action returns a #${id} couleur`;
  }

  update(id: number, updateCouleurDto: UpdateCouleurDto) {
    return `This action updates a #${id} couleur`;
  }

  remove(id: number) {
    return `This action removes a #${id} couleur`;
  }
}
