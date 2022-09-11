import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtudiantEntity } from './entities/etudiant.entity';
import { EtudiantController } from './etudiant.controller';
import { EtudiantService } from './etudiant.service';

@Module({
  imports: [TypeOrmModule.forFeature([EtudiantEntity])],
  controllers: [EtudiantController],
  providers: [EtudiantService],
})
export class EtudiantModule {}
