import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { RequestUser, UserLogin } from './types/user';
import type { Response } from 'express';
import { UserGuard } from './user.guard';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiResponse({ status: 201, description: 'User register ok' })
  @ApiResponse({ status: 400, description: 'User existent' })
  @ApiBody({ type: CreateUserDto })
  @HttpCode(201)
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }

  @Post('/login')
  async login(@Body() user: UserLogin, @Res() res: Response) {
    const token = await this.userService.login(user);
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login OK', token })
  }

  @Get('/profile')
  @UseGuards(UserGuard)
  profile(@Request() req: RequestUser) {
    return this.userService.profile(req);
  }
}
