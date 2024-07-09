import { forwardRef, Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';
import { UserModule } from 'src/user/user.module';
import { CouleurModule } from 'src/couleur/couleur.module';
import { Images } from './entities/image.entity';
import { UserController } from 'src/user/user.controller';
import { CouleurController } from 'src/couleur/couleur.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Images,ImageRepository]),UserModule,forwardRef(() => CouleurModule)],
  controllers: [ImagesController],
  providers: [ImagesService,UserController,CouleurController],
  exports: [ImagesService],
})
export class ImagesModule {}
