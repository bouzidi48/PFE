import { HttpStatus, Injectable, NotFoundException, Session } from '@nestjs/common';

import { User } from './entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';




import { UserRepository } from './user.repository';

import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';
import * as bcrypt from 'bcrypt';
import { AncienPasswordDto } from './dto/ancien-password.dto';
import { AncienUsernameDto } from './dto/ancien-username.dto';
import { UserCreateDto } from './dto/create-user.dto';
import { FindById } from './dto/find-id.dto';
import { FindByEmail } from './dto/find-email.dto';
import { FindByUsername } from './dto/find-username.dto';
import { UserUpdateDto } from './dto/update-user.dto';

import { Roles } from 'src/enum/user_enum';
import { FindByUsernameByEmail } from './dto/find-username-email.dto';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository:UserRepository,
  ) {}

  async ancienPassword(@Session() request:Record<string, any>,password:AncienPasswordDto) {
    const id = request.idUser
    console.log(id)
    const user = await this.userRepository.findOne({ where: { id: id } });
    console.log(user)
    const validPassword = await bcrypt.compare(password.password, user.password);
    console.log(validPassword)
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

  async updatePassword(@Session() request:Record<string, any>,updateDto:UpdatePasswordDto) {
    const confirmpassword = updateDto.confirmpassword
    const password = updateDto.password
    const id = request.idUser
    console.log(id)
    console.log(confirmpassword)
    console.log(password)
    console.log(confirmpassword == password)
    if(confirmpassword == password) {
      const user = await this.userRepository.findOne({ where: { id: id } });
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(updateDto.password, saltRounds);
      console.log(typeof(user))
      user.password = hashedPassword;
      user.updatedate=new Date();
      this.userRepository.save(user);
      return await {
        message: 'le mot de passe modifier avec succes ,vous devez vous connecter avec votre nouveau mot de passe',
        statusCode: HttpStatus.OK,
      };
    }
    return await {
      message: 'Password != ConfirmPassword',
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }
  
  async ancienUsername(@Session() request:Record<string, any>,username:AncienUsernameDto) {
    const id = request.idUser
    const user = await this.userRepository.findOne({ where: { id: id } });
    const validUsername = await (user.username === username.username);
    if (!validUsername) {
      return await {
        message: 'ancien username incorrect',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
    return await {
      message: 'ancien username correct',
      statusCode: HttpStatus.OK,
    };
  }

  async updateUsername(@Session() request:Record<string, any>,updateUsername:UserNameUpdateDto) {
      const user = await this.userRepository.findOne({ where : { username : updateUsername.username}});
      console.log(user)
      console.log(request.idUser)
      
      
      if(!user) {
        const id = request.idUser
        if(!id) {
          return await {
            message: 'user not found',
            statusCode: HttpStatus.BAD_REQUEST,
          };
        }
        const currentUser = await this.userRepository.findOne({ where : { id : id}});
        currentUser.username = updateUsername.username;
        currentUser.updatedate=new Date();
        console.log(currentUser)
        this.userRepository.save(currentUser);
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
  

    async findOne(id: number){
      const user=await this.userRepository.findOneBy({id});
      if(!user){
        return await {
          data: null,
          statusCode: HttpStatus.BAD_REQUEST,
        }
      }
        return await {
          data: user,
          statusCode: HttpStatus.OK
        };
    }

    async create(createUserDto:UserCreateDto) {
      const user = this.userRepository.create({ ...createUserDto, createdate: new Date() });
      this.userRepository.save(user);
    }
    async findById(find:FindById) {
      const user = await this.userRepository.findOne({ where: { id:find.id } });
      if(!user){
        return await {
          data: null,
          statusCode: HttpStatus.BAD_REQUEST,
        }
      }
        return await {
          data: user,
          statusCode: HttpStatus.OK
        };
    }
    async findByEmail(find:FindByEmail) {
      const user = await this.userRepository.findOne({ where: { email:find.email } });
      if(!user){
        return await {
          data: null,
          statusCode: HttpStatus.BAD_REQUEST,
        }
      }
        return await {
          data: user,
          statusCode: HttpStatus.OK
        };
    }
    async findByUserName(find:FindByUsername) {
      const user = await this.userRepository.findOne({ where: { username:find.username } });
      if(!user){
        return await {
          message: null,
          statusCode: HttpStatus.BAD_REQUEST,
        }
      }
        return await {
          data: user,
          statusCode: HttpStatus.OK
        };
    }

    async update(user:User, updateUserDto: UserUpdateDto) {
      const user1 = await this.userRepository.findOne({ where: { id: user.id } });
      user1.password = updateUserDto.password;
      user1.username = updateUserDto.username;
      user1.updatedate = new Date();
      this.userRepository.save(user1);
    }

    async createAdmin(createUserAdminDto:UserCreateDto) {
      const user = this.userRepository.create(createUserAdminDto);
      user.role = Roles.ADMIN;
      this.userRepository.save(user);
    }

    async findByUsernameAndEmail(find:FindByUsernameByEmail) {
      const user = await this.userRepository.findOne({ where: { email: find.email, username: find.username } });
      if(!user){
        return await {
          data: null,
          statusCode: HttpStatus.BAD_REQUEST,
        }
      }
        return await {
          data: user,
          statusCode: HttpStatus.OK
        };
    }
}
