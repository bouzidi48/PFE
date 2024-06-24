import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Put } from '@nestjs/common';
import { UserService } from './user.service';


import { User } from './entities/user.entity';


import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';
import { AncienPasswordDto } from './dto/ancien-password.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('ancienPassword')
  async ancienPassword(@Body() password:AncienPasswordDto) {
    return await this.userService.ancienPassword(password)
  } 

  @Put('updatePassword')
  async updatePassword(@Body() updatePasswordDto:UpdatePasswordDto) {
    return await this.userService.updatePassword(updatePasswordDto)
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
