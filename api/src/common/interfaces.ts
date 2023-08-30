import { Application } from '../application/application.entity';
import { ScoreInfrastructureDataDto } from '../score/dto/score.dto';
import { REQUEST_METHODS } from './constants';
import { CompletionStatus } from './enums';

export interface AxiosOptions {
  method: REQUEST_METHODS;
  headers: any;
  url: string;
}

export interface BroaderReviewInfrastructureScoreInterface {
  createdAt: Date;
  updatedAt: Date;
  data?: ScoreInfrastructureDataDto;
  finalScore?: number;
  overallComments?: string;
  id: number;
  completionStatus?: CompletionStatus;
  application: Application;
}
