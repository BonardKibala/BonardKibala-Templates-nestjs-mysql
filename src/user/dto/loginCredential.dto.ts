import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// TODO Set customise message for LoginCredentialDto
export class LoginCredentialDto {
  @IsEmail()
  @IsOptional()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
