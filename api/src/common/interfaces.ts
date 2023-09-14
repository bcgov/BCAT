import { Application } from '../application/application.entity';
import { ScoreInfrastructureDataDto, ScoreNetworkDataDto } from '../score/dto/score.dto';
import { REQUEST_METHODS } from './constants';
import { CompletionStatus } from '../completionStatus/completionStatus.entity';

export interface AxiosOptions {
  method: REQUEST_METHODS;
  headers: any;
  url: string;
}

export interface BroaderReviewInfrastructureScoreInterface {
  createdAt: Date;
  updatedAt: Date;
  data?: ScoreInfrastructureDataDto | ScoreNetworkDataDto;
  finalScore?: number;
  overallComments?: string;
  id: number;
  completionStatus?: CompletionStatus;
  application: Application;
}
