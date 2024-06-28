import { Injectable } from '@nestjs/common';
import { CreateCouleurDto } from './dto/create-couleur.dto';
import { UpdateCouleurDto } from './dto/update-couleur.dto';

@Injectable()
export class CouleurService {
  create(createCouleurDto: CreateCouleurDto) {
    
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
