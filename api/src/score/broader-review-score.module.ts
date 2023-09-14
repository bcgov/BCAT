import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BroaderReviewScore } from './broader-review-score.entity';
import { BroaderReviewScoreService } from './broader-review-score.service';
import { CompletionStatusModule } from '../completionStatus/completionStatus.module';

@Module({
  imports: [TypeOrmModule.forFeature([BroaderReviewScore]), CompletionStatusModule],
  exports: [BroaderReviewScoreService],
  controllers: [],
  providers: [BroaderReviewScoreService],
})
export class BroaderReviewScoreModule {}
