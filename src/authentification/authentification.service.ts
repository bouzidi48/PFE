import { HttpStatus, Injectable, Req, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { MailerService } from '@nestjs-modules/mailer';



import * as bcrypt from 'bcrypt';
import { generate } from 'randomstring';
import { UserVerifyDto } from './dto/verify-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserPasswordOublierDto } from './dto/password-oublier.dto';
import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { request } from 'http';
import { UserService } from 'src/user/user.service';
import { UserUpdateDto } from 'src/user/dto/update-user.dto';
@Injectable()
export class AuthentificationService {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService:MailerService,
  ) {}


  async sendEmail(code:string,email:string) {
    await this.mailerService.sendMail({
      to: email,
      from:process.env.EMAIL_HOST_USER,
      subject: 'code de confirmation',
      text:'le code de confirmation est '+code,
    });
    return await {
      message: 'le code est envoyer avec succes',
      statusCode: HttpStatus.OK,
    };
  }

  async verfierCode(@Session() request:Record<string, any>,codeDto:UserVerifyDto) {
    console.log(codeDto)
    console.log(request.code)
    console.log(request.code,codeDto.code)
    if (request.code === codeDto.code) {
      return await true;
    }
    return await false;
  }



 
  async login(@Session() request:Record<string, any>, userLoginDto: UserLoginDto) {
    const user = await this.userService.findByUserName({username:userLoginDto.username});
    console.log(typeof(user))
    if (!user) {
      return await {
        message: 'username incorrect',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
    else {
      const validPassword = await bcrypt.compare(userLoginDto.password, user.data.password);
      if (!validPassword) {
        return await {
          message: 'password incorrect',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
    }
    request.idUser = user.data.id
    console.log(request.idUser)
    
    return await {
      message: 'Bienvenue dans notre application',
      statusCode: HttpStatus.OK,
    };
  }
  async logout() {
    return await {
      message: 'Vous avez bien été deconnecté',
      statusCode: HttpStatus.OK,
    };
  }

  async forgotPassword(@Session() request:Record<string, any>,userPasswordOublierDto: UserPasswordOublierDto) {
    const user = await this.userService.findByEmail({email:userPasswordOublierDto.email});
    if (!user) {
      return await {
        message: 'Email introuvable',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
    const codeConfirmation = await generate({
      length: 6,
      charset: 'numeric',
    });
    request.code = codeConfirmation // Utilisez req.session.code pour stocker le code de confirmation
    request.user = user // Utilisez req.session.user pour stocker les données de l'utilisateur
    await this.sendEmail(codeConfirmation, user.data.email);
    return await {
      message: 'le code est envoyer avec succes',
      statusCode: HttpStatus.OK,
    };
  }
  
  async verifierPasswordOublier(@Session() request:Record<string, any>,codeDto:UserVerifyDto) {
    
    if (this.verfierCode(request,codeDto)) {
      return await {
        message: 'Vous pouvez changer le mot de passe',
        statusCode: HttpStatus.OK,
      };
    }
    return await {
      message: 'code incorrect',
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }
  async modifierPassword(@Session() request:Record<string, any>,passDto:UpdatePasswordDto) {
    const confirmpassword = passDto.confirmpassword
    const password = passDto.password
    const user = request.user
    console.log(user)
    if(confirmpassword == password) {
      console.log("1")
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(passDto.password, saltRounds);
      const updateUser = { username: user.username, password: hashedPassword };
      await this.userService.update(user,updateUser)
      console.log(user)
      return await {
        message: 'vous avez bien changer votre mot de passe',
        statusCode: HttpStatus.OK,
      };
    }
    return await {
      message: 'Password != ConfirmPassword',
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }
  async accessToken(user:User):Promise<string>{
    const jwt = require('jsonwebtoken');
  
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
  );
  
  }
}
