import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { User } from './entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';




import { UserRepository } from './user.repository';

import { UserSessionService } from './session/service/userSession.service';
import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';
import * as bcrypt from 'bcrypt';
import { AncienPasswordDto } from './dto/ancien-password.dto';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository:UserRepository,
    private readonly session: UserSessionService
  ) {}

  async ancienPassword(password:AncienPasswordDto) {
    const id = this.session.session.get('idUser')
    const user = await this.userRepository.findOne({ where: { id: id } });
    const validPassword = await bcrypt.compare(password.password, user.password);
    if (!validPassword) {
      return await {
        message: 'ancien mot de passe incorrect',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
    return await {
      message: 'ancien mot de passe correct',
      statusCode: HttpStatus.OK,
    };
  }

  async updatePassword(updateDto:UpdatePasswordDto) {
    const confirmpassword = updateDto.confirmpassword
    const password = updateDto.password
    const id = this.session.session.get('idUser')
    if(confirmpassword == password) {
      const user = await this.userRepository.findOne({ where: { id: id } });
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(updateDto.password, saltRounds);
      console.log(typeof(user))
      user.password = hashedPassword;
      user.updatedate=new Date();
      this.userRepository.save(user);
      this.session.session.delete('idUser')
      console.log(this.session.session.get('idUser'))
      return await {
        message: 'le mot de passe modifier avec succés,vous devez vous connecter avec votre nouveau mot de passe',
        statusCode: HttpStatus.OK,
      };
    }
    return await {
      message: 'Password != ConfirmPassword',
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }
  


  async updateUsername(updateUsername:UserNameUpdateDto) {
      const user = await this.userRepository.findOne({ where : { username : updateUsername.username}});
      console.log(user)
      console.log(this.session.session)
      console.log(this.session.session.get('idUser'))
      if(!user) {
        const id = await this.session.session.get('idUser')
        if(!id) {
          return await {
            message: 'user not found',
            statusCode: HttpStatus.BAD_REQUEST,
          };
        }
        const currentUser = await this.userRepository.findOne({ where : { id : this.session.session.get('idUser')}});
        currentUser.username = updateUsername.username;
        currentUser.updatedate=new Date();
        console.log(currentUser)
        this.userRepository.save(currentUser);
        this.session.session.delete('idUser')
        return await {
          message: 'Username modifier avec succés,vous devez vous connecter avec votre nouveau username',
          statusCode: HttpStatus.OK,
        };
      }
      return await {
        message: 'user deja existe',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
  

    async findOne(id: number):Promise<User> {
      const user=await this.userRepository.findOneBy({id});
      if(!user) throw new NotFoundException('user not found ')
      return user;
    }
}
