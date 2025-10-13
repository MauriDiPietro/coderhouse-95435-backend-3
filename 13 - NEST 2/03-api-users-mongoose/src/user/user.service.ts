import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { UserDocument } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { createHash, isValidPass } from './helpers/bcrypt';
import { RequestUser, UserLogin } from './types/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private JwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<UserDocument | null> {
    const { email, password } = createUserDto;
    const exist = await this.findByEmail(email);
    if (exist) throw new NotFoundException('El usuario ya existe');
    return await this.UserModel.create({
      ...createUserDto,
      password: createHash(password),
    });
  }

  async login(user: UserLogin) {
    const { email, password } = user;
    const exist = await this.findByEmail(email);
    if (!exist) throw new BadRequestException('Credenciales incorrectas');
    const passValid = isValidPass(password, exist.password);
    if (!passValid) throw new BadRequestException('Credenciales incorrectas');
    return this.generateToken(exist);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.UserModel.findOne({ email });
  }

  generateToken(user: UserDocument): string {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };
    return this.JwtService.sign(payload);
  }

  profile(req: RequestUser) {
    return req.user;
  }
}
