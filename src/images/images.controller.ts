import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Put } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FindByImageDto } from './dto/find-by-Image.dto';
import { FindByCouleurDto } from './dto/find-by-couleur.dto';
import { FindByIdNameDto } from './dto/find-by-Id-Name.dto';
import { RemoveImageDto } from './dto/remove-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Session() request:Record<string, any>,@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(request,createImageDto);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get('findByImage')
  async findByImage(@Body() findByImage: FindByImageDto) {
    return await this.imagesService.findByNameImage(findByImage);
  }

  @Get('findByCouleur')
  async findByCouleur(@Body() findByCouleur: FindByCouleurDto) {
    return await this.imagesService.findByCouleur(findByCouleur);
  }
  @Get('findByNameAndId')
  async findByNameAndId(@Body() nameAndIdProduct: FindByIdNameDto) {
    return await this.imagesService.findByNameAndId(nameAndIdProduct);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Put('update')
  update(@Session() request:Record<string, any>, @Body() updateSizeDto: UpdateImageDto) {
    return this.imagesService.update(request, updateSizeDto);
  }

  @Delete('remove')
  remove(@Session() request:Record<string, any>, @Body() removeSizeDto: RemoveImageDto) {
    return this.imagesService.remove(request, removeSizeDto);
  }
}
