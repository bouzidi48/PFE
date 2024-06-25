import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';
import { AncienPasswordDto } from './dto/ancien-password.dto';
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
    updateUsername(request: Record<string, any>, updateUsername: UserNameUpdateDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    findOne(id: string): Promise<User>;
}
