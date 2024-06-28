import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouleurService } from './couleur.service';
import { CreateCouleurDto } from './dto/create-couleur.dto';
import { UpdateCouleurDto } from './dto/update-couleur.dto';

@Controller('couleur')
export class CouleurController {
  constructor(private readonly couleurService: CouleurService) {}

  @Post()
  create(@Body() createCouleurDto: CreateCouleurDto) {
    return this.couleurService.create(createCouleurDto);
  }

  @Get()
  findAll() {
    return this.couleurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couleurService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouleurDto: UpdateCouleurDto) {
    return this.couleurService.update(+id, updateCouleurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couleurService.remove(+id);
  }
}
