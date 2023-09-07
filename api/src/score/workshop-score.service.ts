import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Application } from '../application/application.entity';
import { CompletionStatus } from '../completionStatus/completionStatus.entity';
import { CompletionStatus as CompletionStatusEnum } from '../common/enums';
import { CompletionStatusService } from '../completionStatus/completionStatus.service';
import { GenericException } from '../common/generic-exception';
import { ScoreDto } from './dto/score.dto';
import { ScoreError } from './score.errors';
import { User } from '../user/user.entity';
import { WorkshopScore } from './workshop-score.entity';

@Injectable()
export class WorkshopScoreService {
  constructor(
    @InjectRepository(WorkshopScore)
    private workshopScoreRepository: Repository<WorkshopScore>,
    private completionStatusService: CompletionStatusService
  ) {}

  async getWorkshopScoreForApplication(applicationId: number) {
    return await this.workshopScoreRepository.find({
      where: { application: applicationId },
      relations: ['user', 'completionStatus'],
      loadRelationIds: true,
    });
  }

  async getWorkshopScore(id: string) {
    const score = await this.workshopScoreRepository.findOne(id, {
      relations: ['user', 'application', 'completionStatus'],
    });
    if (!score) {
      throw new GenericException(ScoreError.SCORE_NOT_FOUND);
    }
    return score;
  }

  async createWorkshopScore(
    user: User,
    application: Application,
    completionStatus: CompletionStatus,
    scoreDto: ScoreDto
  ): Promise<WorkshopScore> {
    const existingScore = await this.workshopScoreRepository.findOne({
      where: { application },
    });
    if (existingScore) {
      throw new GenericException(ScoreError.SCORE_EXISTS);
    }
    const score = this.workshopScoreRepository.create({
      ...scoreDto,
      user,
      application,
      completionStatus,
    });

    return this.workshopScoreRepository.save(score);
  }

  async updateWorkshopScore(
    application: Application,
    scoreId: string,
    scoreDto: ScoreDto
  ): Promise<WorkshopScore> {
    const score = await this.getWorkshopScore(scoreId);

    if (score.application.id !== application.id) {
      throw new GenericException(ScoreError.APPLICATION_MISMATCH);
    }
    const newScore = {
      completionStatus: null,
      data: scoreDto.data,
      finalScore: scoreDto.finalScore,
      overallComments: scoreDto.overallComments,
    };
    const completionStatus = await this.completionStatusService.getCompletionStatusByName(
      scoreDto.status
    );
    newScore.completionStatus = completionStatus;

    return this.workshopScoreRepository.save({ ...score, ...newScore });
  }

  async getApplicationDetailsWithFinalScore(applicationId: number): Promise<WorkshopScore> {
    return this.workshopScoreRepository
      .createQueryBuilder('workshop')
      .innerJoinAndSelect('workshop.application', 'application')
      .innerJoinAndSelect('application.form', 'form')
      .innerJoinAndSelect('workshop.completionStatus', 'completionStatus')
      .where('application.id = :applicationId', { applicationId })
      .andWhere('completionStatus.name = :status', { status: CompletionStatusEnum.COMPLETE })
      .getOne();
  }
}
