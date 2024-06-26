import { HttpStatus } from '@nestjs/common';
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
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    ancienPassword(request: Record<string, any>, password: AncienPasswordDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    updatePassword(request: Record<string, any>, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    ancienUsername(request: Record<string, any>, username: AncienUsernameDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    updateUsername(request: Record<string, any>, updateUsername: UserNameUpdateDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    create(createUserDto: UserCreateDto): Promise<void>;
    findOne(id: string): Promise<{
        data: User;
        statusCode: HttpStatus;
    }>;
    findById(id: FindById): Promise<{
        data: User;
        statusCode: HttpStatus;
    }>;
    findByEmail(email: FindByEmail): Promise<{
        data: User;
        statusCode: HttpStatus;
    }>;
    findByUserName(username: FindByUsername): Promise<{
        message: any;
        statusCode: HttpStatus;
        data?: undefined;
    } | {
        data: User;
        statusCode: HttpStatus;
        message?: undefined;
    }>;
    update(user: User, updateUserDto: UserUpdateDto): Promise<void>;
}
