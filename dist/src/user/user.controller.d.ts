import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/modifier-password.dto';
import { UserNameUpdateDto } from './dto/update-username.dto';
import { AncienPasswordDto } from './dto/ancien-password.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    ancienPassword(password: AncienPasswordDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    updateUsername(updateUsername: UserNameUpdateDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    findOne(id: string): Promise<User>;
}
