import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('login')
export class LoginEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  login: string;

  @Column()
  password: string;
}
