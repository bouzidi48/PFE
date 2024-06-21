import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserVerifyDto } from './dto/verify-user.dto';
import { UserPasswordOublierDto } from './dto/password-oublier.dto';
import { UserLoginDto } from './dto/user-login.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(signupUserDto: UserSignUpDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    verfierInscription(code: UserVerifyDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    login(userLoginDto: UserLoginDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    logout(): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    forgotPassword(userPasswordOublierDto: UserPasswordOublierDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    verfierPasswordOublier(code: UserVerifyDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    create(createUserDto: CreateUserDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
