import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { generate } from 'randomstring';
import { Session } from 'express-session';
import { UserVerifyDto } from './dto/verify-user.dto';
import { UserPasswordOublierDto } from './dto/password-oublier.dto';
import { UserRepository } from './user.repository';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSessionService } from './session/service/userSession.service';
import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository:UserRepository,
    private readonly mailerService:MailerService,
    private readonly session: UserSessionService
  ) {}

  async signup(userSignUpDto: UserSignUpDto) {
    const existingEmail = await this.userRepository.findOne({ where: { email: userSignUpDto.email } });
    const existingUser = await this.userRepository.findOne({ where: { username: userSignUpDto.username } });
    if (existingEmail || existingUser) {
      return await {
        message: 'Email ou username déjà existe',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
    const codeConfirmation = await generate({
      length: 6,
      charset: 'numeric',
    });
    console.log(typeof(codeConfirmation))
    console.log(userSignUpDto)
    console.log(typeof(userSignUpDto))
    
    this.session.session.set('code', codeConfirmation) // Utilisez req.session.code pour stocker le code de confirmation
    this.session.session.set('user', userSignUpDto) // Utilisez req.session.user pour stocker les données de l'utilisateur
    console.log(this.session.session.get('code'),codeConfirmation)
    console.log(this.session.session.get('user'))
    return await this.sendEmail(codeConfirmation, userSignUpDto.email);
  }
  

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

  async verfierCode(codeDto:UserVerifyDto) {
    console.log(codeDto)
    console.log(this.session.session.get('code'))
    console.log(this.session.session.get('code'),codeDto.code)
    if (this.session.session.get('code') === codeDto.code) {
      return await true;
    }
    return await false;
  }



  async verfierInscription(codeDto:UserVerifyDto) {
    
    if (this.verfierCode(codeDto)) {
      const userSignUpDto = this.session.session.get('user')
      console.log(userSignUpDto)
      const user = this.userRepository.create({ ...userSignUpDto, createdate: new Date() });
      this.userRepository.save(user);
      this.session.session.delete('code')
      this.session.session.delete('user')
      return await {
        message: 'Bienvenue dans notre application',
        statusCode: HttpStatus.OK,
      };
    }
    return await {
      message: 'code incorrect',
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.userRepository.findOne({ where: { username: userLoginDto.username, password: userLoginDto.password } });
    if (!user) {
      return await {
        message: 'username ou password incorrect',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
    this.session.session.set('idUser', user.id)
    return await {
      message: 'Bienvenue dans notre application',
      statusCode: HttpStatus.OK,
    };
  }
  async logout() {
    this.session.session.delete('idUser')
    return await {
      message: 'Vous avez bien été deconnecté',
      statusCode: HttpStatus.OK,
    };
  }

  async forgotPassword(userPasswordOublierDto: UserPasswordOublierDto) {
    const user = await this.userRepository.findOne({ where: { email: userPasswordOublierDto.email } });
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
    this.session.session.set('code', codeConfirmation) // Utilisez req.session.code pour stocker le code de confirmation
    this.session.session.set('user', user) // Utilisez req.session.user pour stocker les données de l'utilisateur
    await this.sendEmail(codeConfirmation, user.email);
    return await {
      message: 'le code est envoyer avec succes',
      statusCode: HttpStatus.OK,
    };
  }
  
  async verifierPasswordOublier(codeDto:UserVerifyDto) {
    
    if (this.verfierCode(codeDto)) {

      this.session.session.delete('code')
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

  async modifierPassword(passDto:UpdatePasswordDto) {
    const confirmpassword = passDto.confirmpassword
    const password = passDto.password
    const user = this.session.session.get('user')

    if(confirmpassword == password) {
      user.password = password;
      this.userRepository.save(user);
      this.session.session.delete('user')
      return await {
        message: 'Vous pouvez changer le mot de passe',
        statusCode: HttpStatus.OK,
      };
    }
    return await {
      message: 'Password != ConfirmPassword',
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  async updatePassword(updateDto:UpdatePasswordDto) {
    const confirmpassword = updateDto.confirmpassword
    const password = updateDto.password
    const id = this.session.session.get('idUser')
    if(confirmpassword == password) {
      const user = await this.userRepository.findOne({ where: { id: id } });
      user.password = password
      this.userRepository.save(user);
      this.session.session.delete('user')
      return await {
        message: 'le mot de passe modifier avec succés',
        statusCode: HttpStatus.OK,
      };
    }
    return await {
      message: 'Password != ConfirmPassword',
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }
  async updateUsername(updateUsername:UserNameUpdateDto) {
    const user = await this.userRepository.findOne({ where : { username : updateUsername.username}})

    if(!user) {
      user.username = updateUsername.username
      
      this.userRepository.save(user);
      return await {
        message: 'Username modifier avec succés',
        statusCode: HttpStatus.OK,
      };
    }
    return await {
      message: 'Username deja existe',
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }
  

  
}
