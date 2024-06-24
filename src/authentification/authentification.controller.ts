import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserPasswordOublierDto } from './dto/password-oublier.dto';
import { UserVerifyDto } from './dto/verify-user.dto';
import { UpdatePasswordDto } from './dto/modifier-password.dto';


@Controller('authentification')
export class AuthentificationController {
  constructor(private readonly authentificationService: AuthentificationService) {}

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.authentificationService.login(userLoginDto);
  }

  @Post('logout')
  async logout() {
    return await this.authentificationService.logout();
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() userPasswordOublierDto: UserPasswordOublierDto) {
    return await this.authentificationService.forgotPassword(userPasswordOublierDto);
  }
  @Post('verifierPasswordOublier')
  async verfierPasswordOublier(@Body() code: UserVerifyDto) {
    return await this.authentificationService.verifierPasswordOublier(code);
  }

  @Put('modifierPassword')
  async modifierPassword(@Body() passDto:UpdatePasswordDto) {
    return await this.authentificationService.modifierPassword(passDto)
  }
}
