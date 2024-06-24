import { HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserSessionService } from './session/service/userSession.service';
import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';
import { AncienPasswordDto } from './dto/ancien-password.dto';
export declare class UserService {
    private userRepository;
    private readonly session;
    constructor(userRepository: UserRepository, session: UserSessionService);
    ancienPassword(password: AncienPasswordDto): Promise<{
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
