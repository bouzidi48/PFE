import { HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';
import { AncienPasswordDto } from './dto/ancien-password.dto';
import { AncienUsernameDto } from './dto/ancien-username.dto';
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
    findOne(id: number): Promise<User>;
}
