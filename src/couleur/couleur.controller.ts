import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Put } from '@nestjs/common';
import { CouleurService } from './couleur.service';
import { CreateCouleurDto } from './dto/create-couleur.dto';
import { UpdateCouleurDto } from './dto/update-couleur.dto';
import { RemoveCouleurDto } from './dto/remove-couleur.dto';
import { FindByProductDto } from './dto/find-by-product.dto';
import { FindByCouleurDto } from './dto/find-by-couleur.dto';
import { FindByIdNameDto } from './dto/find-by-Id-Name.dto';

@Controller('couleur')
export class CouleurController {
  constructor(private readonly couleurService: CouleurService) {}

  @Post('create')
  create(@Session() request:Record<string, any>,@Body() createCouleurDto: CreateCouleurDto) {
    return this.couleurService.create(request,createCouleurDto);
  }

  @Get('all')
  findAll() {
    return this.couleurService.findAll();
  }
  @Get('findbyCouleur')
  findByCouleur(@Body() findByCouleur: FindByCouleurDto) {
    return this.couleurService.findByNameCouleur(findByCouleur);
  }

  @Get('findbyProduct')
  findByProduct(@Body() findByProduct: FindByProductDto) {
    return this.couleurService.findByProduct(findByProduct);
  }
  @Get('findbyIdAndName')
  findByIdAndName(@Body() nameAndIdProduct: FindByIdNameDto) {
    return this.couleurService.findByNameAndId(nameAndIdProduct);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couleurService.findOne(+id);
  }

  @Put('update')
  update(@Session() request:Record<string, any>, @Body() updateCouleurDto: UpdateCouleurDto) {
    return this.couleurService.update(request, updateCouleurDto);
  }

  @Delete('remove')
  remove(@Session() request:Record<string, any>, @Body() removeCouleurDto: RemoveCouleurDto) {
    return this.couleurService.remove(request, removeCouleurDto);
  }
}
