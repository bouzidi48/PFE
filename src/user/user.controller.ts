import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Put, Session } from '@nestjs/common';
import { UserService } from './user.service';


import { User } from './entities/user.entity';


import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';
import { AncienPasswordDto } from './dto/ancien-password.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('ancienPassword')
  async ancienPassword(@Session() request:Record<string, any>,@Body() password:AncienPasswordDto) {
    return await this.userService.ancienPassword(request,password)
  } 

  @Put('updatePassword')
  async updatePassword(@Session() request:Record<string, any>,@Body() updatePasswordDto:UpdatePasswordDto) {
    return await this.userService.updatePassword(request,updatePasswordDto)
  }


  @Put('updateUsername')
  async updateUsername(@Session() request:Record<string, any>, @Body() updateUsername:UserNameUpdateDto) {
    return await this.userService.updateUsername(request,updateUsername)
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) :Promise<User> {
    return  await this.userService.findOne(+id);
  }

  
}
