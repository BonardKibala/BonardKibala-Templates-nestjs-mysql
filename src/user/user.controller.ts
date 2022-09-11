import { Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Body, Controller } from '@nestjs/common';
import { AddUserDto, UpdateUserDto, LoginCredentialDto } from './dto/user.dto';
import { LoginEntity } from './entities/login.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() credentials: LoginCredentialDto) {
    return await this.userService.login(credentials);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async getAllUser(): Promise<LoginEntity> {
    return await this.userService.findAllUsers();
  }

  @Post('/register')
  async registerClient(@Body() userUserDto: AddUserDto): Promise<any> {
    return await this.userService.registerUser(userUserDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<LoginEntity> {
    return await this.userService.getuserById(id);
  }

  @Patch(':id')
  async updateUser(
    @Body() updateUser: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<LoginEntity> {
    return await this.userService.updateUser(id, updateUser);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return await this.userService.removeUser(id);
  }
}
