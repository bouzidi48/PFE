import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserVerifyDto } from './dto/verify-user.dto';


@Controller('inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {}
  @Post('signup')
  async signup(@Body() signupUserDto: UserSignUpDto) {
    return await this.inscriptionService.signup(signupUserDto);
  }
  @Post('verifierInscription')
  async verfierInscription(@Body() code: UserVerifyDto) {
    return await this.inscriptionService.verfierInscription(code);
  }
  
}
