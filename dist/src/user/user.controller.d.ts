import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserVerifyDto } from './dto/verify-user.dto';
import { UserPasswordOublierDto } from './dto/password-oublier.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';
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
    updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    modifierPassword(passDto: UpdatePasswordDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    updateUsername(updateUsername: UserNameUpdateDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
}
