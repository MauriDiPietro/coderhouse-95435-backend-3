import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { RequestUser, UserLogin } from './types/user';
import type { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto): Promise<import("./schema/user.schema").UserDocument | null>;
    login(user: UserLogin, res: Response): Promise<void>;
    profile(req: RequestUser): {
        first_name: string;
        last_name: string;
        email: string;
        role: string;
    };
}
