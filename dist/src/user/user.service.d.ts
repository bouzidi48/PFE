import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { CustomSessionService } from 'src/session/service/customSession.service';
import { UserVerifyDto } from './dto/verify-user.dto';
import { UserPasswordOublierDto } from './dto/password-oublier.dto';
import { UserRepository } from './user.repository';
import { UserLoginDto } from './dto/user-login.dto';
export declare class UserService {
    private userRepository;
    private readonly mailerService;
    private readonly session;
    constructor(userRepository: UserRepository, mailerService: MailerService, session: CustomSessionService);
    create(createUserDto: CreateUserDto): string;
    signup(userSignUpDto: UserSignUpDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    sendEmail(code: string, email: string): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    verfierCode(codeDto: UserVerifyDto): Promise<boolean>;
    verifierPasswordOublier(codeDto: UserVerifyDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
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
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
