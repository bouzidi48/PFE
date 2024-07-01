import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';
import { UserModule } from 'src/user/user.module';
import { CouleurModule } from 'src/couleur/couleur.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image,ImageRepository]),UserModule,CouleurModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
