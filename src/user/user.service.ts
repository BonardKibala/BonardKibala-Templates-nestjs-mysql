import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { LoginEntity } from './entities/login.entity';
import { validatePassword } from 'src/utils/validatePassword';
import { LoginCredentialDto } from './dto/loginCredential.dto';
import { AddUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(LoginEntity)
    private userRepository: Repository<LoginEntity>,
  ) {}

  async findAllUsers(): Promise<any> {
    const users = await this.userRepository.find();
    return { total_users: users.length, users };
  }

  async registerUser(userDto: AddUserDto): Promise<any> {
    const { login } = userDto;
    //validation supplémentaire
    const password = validatePassword(
      userDto.password,
      userDto.password_confirm,
    );

    // création de l'objet user
    const userData = { login, password };
    const user = this.userRepository.create({ ...userData });

    const finduser = await this.userRepository.findOne({
      login: user.login,
    });

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    // Début de la transaction
    await queryRunner.startTransaction();

    try {
      if (finduser) {
        return { error: "l'utilisateur existe déjà" };
      }
      await queryRunner.manager.save(user);

      // Fin de la transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // Annulation des enregistrement en cas d'un echec
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
    return {
      success: 'Enregistrement effectué avec succès',
    };
  }

  async login(credentials: LoginCredentialDto) {
    const { login, password } = credentials;

    const qb = this.userRepository
      .createQueryBuilder('login')
      .where('login.login= :login')
      .setParameters({ login });

    const user: LoginEntity = await qb.getOne();

    if (!user)
      throw new NotFoundException({
        error: "le login ci-après n'existe pas, essayez-en un autre svp",
      });

    if (password === user.password) {
      const payload = {
        id: user.id,
        login: user.login,
      };
      const userlogged = { id: user.id, login: user.login };
      return { user: userlogged, acces_token: this.jwtService.sign(payload) };
    } else
      throw new NotFoundException({
        error: 'Mot de passe incorect',
      });
  }

  async getuserById(id: string): Promise<LoginEntity> {
    return await this.userRepository.findOne(id);
  }

  async updateUser(
    id: string,
    updateUser: UpdateUserDto,
  ): Promise<LoginEntity> {
    const newUser = await this.userRepository.preload({
      id,
      ...updateUser,
    });

    if (!newUser) {
      throw new NotFoundException({
        error: 'échec de modification',
      });
    }
    return this.userRepository.save(newUser);
  }

  async removeUser(id: string) {
    const userToremove = await this.userRepository.findOne(id);
    if (!userToremove) {
      throw new NotFoundException({
        error: `Erreur de suppression ou adresse non existante`,
      });
    }
    return await this.userRepository.remove(userToremove);
  }
}
