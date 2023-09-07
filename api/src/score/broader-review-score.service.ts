import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Application } from '../application/application.entity';
import { BroaderReviewScore } from './broader-review-score.entity';
import { BroaderReviewScoreResultRo } from './ro/broader-review-score.ro';
import { CompletionStatus } from '../completionStatus/completionStatus.entity';
import { CompletionStatusService } from '../completionStatus/completionStatus.service';
import { GenericException } from '../common/generic-exception';
import { ScoreDto } from './dto/score.dto';
import { ScoreError } from './score.errors';
import { User } from '../user/user.entity';

@Injectable()
export class BroaderReviewScoreService {
  constructor(
    @InjectRepository(BroaderReviewScore)
    private scoreRepository: Repository<BroaderReviewScore>,
    private completionStatusService: CompletionStatusService
  ) {}

  async getBroaderReviewScores(applicationId: number) {
    const scores = await this.scoreRepository.find({
      where: { application: applicationId },
      relations: ['user', 'completionStatus'],
    });
    return new BroaderReviewScoreResultRo(scores).result;
  }

  async getBroaderReviewScore(id: string) {
    const score = await this.scoreRepository.findOne(id, {
      relations: ['user', 'application', 'completionStatus'],
    });
    if (!score) {
      throw new GenericException(ScoreError.SCORE_NOT_FOUND);
    }
    return score;
  }

  async createBroaderReviewScore(
    user: User,
    application: Application,
    completionStatus: CompletionStatus,
    scoreDto: ScoreDto
  ): Promise<BroaderReviewScore> {
    // const scoreObj = { finalScore: 0, data: scoreDto, overallComments: scoreDto.overallComments}
    const score = this.scoreRepository.create({ ...scoreDto, user, application, completionStatus });

    return this.scoreRepository.save(score);
  }

  async updateBroaderReviewScore(
    user: User,
    application: Application,
    scoreId: string,
    scoreDto: ScoreDto
  ): Promise<BroaderReviewScore> {
    const score = await this.getBroaderReviewScore(scoreId);
    if (score.user.id !== user.id) {
      throw new GenericException(ScoreError.USER_MISMATCH);
    }
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
    return this.scoreRepository.save({ ...score, ...newScore });
  }
}
