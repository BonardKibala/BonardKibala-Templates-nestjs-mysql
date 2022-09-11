import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginEntity } from 'src/user/entities/login.entity';
import { Repository } from 'typeorm';
import { IPayload } from '../interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(LoginEntity)
    private userRepository: Repository<LoginEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET'),
    });
  }

  async validate(payload: IPayload) {
    const login = await this.userRepository.findOne({
      login: payload.login,
    });

    //Si l'utilisateur exist, il est retourné dans la requette
    if (login) {
      return login;
    } else {
      throw new UnauthorizedException({
        error: "Vous n'avez pas l'autorisation requis",
      });
    }
  }
}
