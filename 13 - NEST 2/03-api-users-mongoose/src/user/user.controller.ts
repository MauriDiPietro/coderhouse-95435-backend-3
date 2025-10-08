import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { RequestUser, UserLogin } from './types/user';
import type { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }

  @Post('/login')
  async login(@Body() user: UserLogin, @Res() res: Response) {
    const token = await this.userService.login(user);
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login OK', token })
  }

  @Get('profile')
  // @UserGuards()
  profile(@Request() req: RequestUser) {
    return this.userService.profile(req);
  }
}
