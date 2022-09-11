import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginEntity } from './entities/login.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';
import { JwtStrategy } from 'src/authentification/strategy/passport-client-jwt.strategy';

dotenv.config();
console.log(process.env.SECRET);
@Module({
  imports: [
    TypeOrmModule.forFeature([LoginEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
