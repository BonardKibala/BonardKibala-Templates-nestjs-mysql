import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddEtudiantDto {
  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  postnom: string;

  @IsOptional()
  prenom: string;
}

export class UpdateEtudiantDto {
  @IsOptional()
  nom: string;

  @IsOptional()
  postnom: string;

  @IsOptional()
  prenom: string;
}
