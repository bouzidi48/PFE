import { HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserVerifyDto } from './dto/verify-user.dto';
import { UserPasswordOublierDto } from './dto/password-oublier.dto';
import { UserRepository } from './user.repository';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSessionService } from './session/service/userSession.service';
import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';
export declare class UserService {
    private userRepository;
    private readonly mailerService;
    private readonly session;
    constructor(userRepository: UserRepository, mailerService: MailerService, session: UserSessionService);
    signup(userSignUpDto: UserSignUpDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    sendEmail(code: string, email: string): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    verfierCode(codeDto: UserVerifyDto): Promise<boolean>;
    verfierInscription(codeDto: UserVerifyDto): Promise<{
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
    verifierPasswordOublier(codeDto: UserVerifyDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    modifierPassword(passDto: UpdatePasswordDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    updatePassword(updateDto: UpdatePasswordDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    updateUsername(updateUsername: UserNameUpdateDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    findOne(id: number): Promise<User>;
}
