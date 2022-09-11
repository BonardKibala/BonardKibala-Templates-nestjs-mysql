import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('etudiant')
export class EtudiantEntity {
  @PrimaryGeneratedColumn('uuid')
  etudiantId: string;

  @Column()
  nom: string;

  @Column()
  postnom: string;

  @Column()
  prenom: string;
}
