import { HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';
import { AncienPasswordDto } from './dto/ancien-password.dto';
import { AncienUsernameDto } from './dto/ancien-username.dto';
import { UserCreateDto } from './dto/create-user.dto';
import { FindById } from './dto/find-id.dto';
import { FindByEmail } from './dto/find-email.dto';
import { FindByUsername } from './dto/find-username.dto';
import { UserUpdateDto } from './dto/update-user.dto';
import { FindByUsernameByEmail } from './dto/find-username-email.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    ancienPassword(request: Record<string, any>, password: AncienPasswordDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    updatePassword(request: Record<string, any>, updateDto: UpdatePasswordDto): Promise<{
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
    findOne(id: number): Promise<{
        data: User;
        statusCode: HttpStatus;
    }>;
    create(createUserDto: UserCreateDto): Promise<void>;
    findById(find: FindById): Promise<{
        data: User;
        statusCode: HttpStatus;
    }>;
    findByEmail(find: FindByEmail): Promise<{
        data: User;
        statusCode: HttpStatus;
    }>;
    findByUserName(find: FindByUsername): Promise<{
        message: any;
        statusCode: HttpStatus;
        data?: undefined;
    } | {
        data: User;
        statusCode: HttpStatus;
        message?: undefined;
    }>;
    update(user: User, updateUserDto: UserUpdateDto): Promise<void>;
    createAdmin(createUserAdminDto: UserCreateDto): Promise<void>;
    findByUsernameAndEmail(find: FindByUsernameByEmail): Promise<{
        data: User;
        statusCode: HttpStatus;
    }>;
}
