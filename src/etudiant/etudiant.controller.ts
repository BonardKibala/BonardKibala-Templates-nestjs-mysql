import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddEtudiantDto, UpdateEtudiantDto } from './dto/etudiant.dto';
import { EtudiantEntity } from './entities/etudiant.entity';
import { EtudiantService } from './etudiant.service';

@Controller('etudiant')
export class EtudiantController {
  constructor(private readonly etudiantservice: EtudiantService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async getAllStudents(): Promise<any> {
    return await this.etudiantservice.findAllStudents();
  }

  @Post('/register')
  async registerClient(@Body() studentDto: AddEtudiantDto): Promise<any> {
    return await this.etudiantservice.registerEtudiant(studentDto);
  }

  @Get(':etudiantId')
  async getUserById(
    @Param('etudiantId') etudiantId: string,
  ): Promise<EtudiantEntity> {
    return await this.etudiantservice.getEtudiantById(etudiantId);
  }

  @Patch(':etudiantId')
  async updateUser(
    @Body() updateUser: UpdateEtudiantDto,
    @Param('etudiantId') etudiantId: string,
  ): Promise<EtudiantEntity> {
    return await this.etudiantservice.updateEtudiant(etudiantId, updateUser);
  }

  @Delete(':etudiantId')
  async removeStudent(@Param('etudiantId') etudiantId: string) {
    return await this.etudiantservice.removeEtudiant(etudiantId);
  }
}
