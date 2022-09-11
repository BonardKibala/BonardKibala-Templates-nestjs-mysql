import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { AddEtudiantDto, UpdateEtudiantDto } from './dto/etudiant.dto';
import { EtudiantEntity } from './entities/etudiant.entity';

@Injectable()
export class EtudiantService {
  constructor(
    @InjectRepository(EtudiantEntity)
    private etudiantRepository: Repository<EtudiantEntity>,
  ) {}

  //Retourner tous les étudiants
  async findAllStudents(): Promise<any> {
    const etudiants = await this.etudiantRepository.find();
    return { data: etudiants };
  }

  //   Création de l'étudiant
  async registerEtudiant(etudiantDto: AddEtudiantDto): Promise<any> {
    const etudiant = this.etudiantRepository.create({ ...etudiantDto });

    const findEtudiant = await this.etudiantRepository.findOne({
      nom: etudiant.nom,
      postnom: etudiant.postnom,
    });

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    // Début de la transaction
    await queryRunner.startTransaction();

    try {
      // Enregistrement de 'étudiant
      if (findEtudiant) {
        return { error: 'Cet étudiant existe déjà' };
      }
      await queryRunner.manager.save(etudiant);

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
      success: 'Etudiant Enregistrer avec succès',
    };
  }

  async getEtudiantById(etudiantId: string): Promise<EtudiantEntity> {
    return await this.etudiantRepository.findOne(etudiantId);
  }

  async updateEtudiant(
    etudiantId: string,
    updateEtudiant: UpdateEtudiantDto,
  ): Promise<EtudiantEntity> {
    const newEtudiant = await this.etudiantRepository.preload({
      etudiantId,
      ...updateEtudiant,
    });

    if (!newEtudiant) {
      throw new NotFoundException('échec de modification');
    }
    return await this.etudiantRepository.save(newEtudiant);
  }

  async removeEtudiant(etudiantId: string) {
    const etudiantToremove = await this.etudiantRepository.findOne(etudiantId);
    if (!etudiantToremove) {
      throw new NotFoundException(
        `Erreur de suppression ou l'information n'existe pas`,
      );
    }
    await this.etudiantRepository.remove(etudiantToremove);
    const etudiants = await this.etudiantRepository.find();
    return {
      data: etudiants,
    };
  }
}
