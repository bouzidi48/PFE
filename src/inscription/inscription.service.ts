import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { UserSessionService } from 'src/user/session/service/userSession.service';
import * as bcrypt from 'bcrypt';
import { generate } from 'randomstring';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserVerifyDto } from './dto/verify-user.dto';

@Injectable()
export class InscriptionService {
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
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userSignUpDto.password, saltRounds);
    
    // Replace the plain password with the hashed password
    const userWithHashedPassword = { ...userSignUpDto, password: hashedPassword };
  
    const codeConfirmation = await generate({
      length: 6,
      charset: 'numeric',
    });
    console.log(typeof(codeConfirmation));
    console.log(userSignUpDto);
    console.log(typeof(userSignUpDto));
    
    this.session.session.set('code', codeConfirmation); // Utilisez req.session.code pour stocker le code de confirmation
    this.session.session.set('user', userWithHashedPassword); // Utilisez req.session.user pour stocker les données de l'utilisateur
    console.log(this.session.session.get('code'), codeConfirmation);
    console.log(this.session.session.get('user'));
    
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
}
