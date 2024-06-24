import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { User } from './entities/user.entity';
import { UserVerifyDto } from './dto/verify-user.dto';
import { UserPasswordOublierDto } from './dto/password-oublier.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupUserDto: UserSignUpDto) {
    return await this.userService.signup(signupUserDto);
  }
  @Post('verifierInscription')
  async verfierInscription(@Body() code: UserVerifyDto) {
    return await this.userService.verfierInscription(code);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.userService.login(userLoginDto);
  }

  @Post('logout')
  async logout() {
    return await this.userService.logout();
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() userPasswordOublierDto: UserPasswordOublierDto) {
    return await this.userService.forgotPassword(userPasswordOublierDto);
  }
  @Post('verifierPasswordOublier')
  async verfierPasswordOublier(@Body() code: UserVerifyDto) {
    return await this.userService.verifierPasswordOublier(code);
  }

  @Put('updatePassword')
  async updatePassword(@Body() updatePasswordDto:UpdatePasswordDto) {
    return await this.userService.updatePassword(updatePasswordDto)
  }

  @Put('modifierPassword')
  async modifierPassword(@Body() passDto:UpdatePasswordDto) {
    return await this.userService.modifierPassword(passDto)
  }

  @Put('updateUsername')
  async updateUsername(@Body() updateUsername:UserNameUpdateDto) {
    return await this.userService.updateUsername(updateUsername)
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) :Promise<User> {
    return  await this.userService.findOne(+id);
  }

  
}
