import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Put, Session } from '@nestjs/common';
import { UserService } from './user.service';


import { User } from './entities/user.entity';


import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';
import { AncienPasswordDto } from './dto/ancien-password.dto';
import { AncienUsernameDto } from './dto/ancien-username.dto';
import { UserCreateDto } from './dto/create-user.dto';
import { FindById } from './dto/find-id.dto';
import { FindByEmail } from './dto/find-email.dto';
import { FindByUsername } from './dto/find-username.dto';
import { UserUpdateDto } from './dto/update-user.dto';


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

  @Post('ancienPassword')
  async ancienUsername(@Session() request:Record<string, any>,@Body() username:AncienUsernameDto) {
    return await this.userService.ancienUsername(request,username)
  }

  @Put('updateUsername')
  async updateUsername(@Session() request:Record<string, any>, @Body() updateUsername:UserNameUpdateDto) {
    return await this.userService.updateUsername(request,updateUsername)
  }

  @Post('create')
  async create(@Body() createUserDto: UserCreateDto) {
    return  await this.userService.create(createUserDto);
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return  await this.userService.findOne(+id);
  }

  @Get("byId")
  async findById(@Body() id: FindById){
    return await this.userService.findById(id)
  }

  @Get('byEmail')
  async findByEmail(@Body() email:FindByEmail) {
    return await this.userService.findByEmail(email)
  }

  @Get('byUserName')
  async findByUserName(@Body() username:FindByUsername) {
    return await this.userService.findByUserName(username)
  }

  @Put('update')
  async update(@Body() user: User,updateUserDto: UserUpdateDto) {
    return await this.userService.update(user,updateUserDto);
  }
}
