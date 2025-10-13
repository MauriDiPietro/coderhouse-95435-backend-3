import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { UserDocument } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { RequestUser, UserLogin } from './types/user';
export declare class UserService {
    private UserModel;
    private JwtService;
    constructor(UserModel: Model<UserDocument>, JwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<UserDocument | null>;
    login(user: UserLogin): Promise<string>;
    findByEmail(email: string): Promise<UserDocument | null>;
    generateToken(user: UserDocument): string;
    profile(req: RequestUser): {
        first_name: string;
        last_name: string;
        email: string;
        role: string;
    };
}
