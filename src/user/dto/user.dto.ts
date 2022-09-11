import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginCredentialDto {
  @IsEmail()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AddUserDto {
  @IsEmail()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  password_confirm: string;
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  login: string;
}
