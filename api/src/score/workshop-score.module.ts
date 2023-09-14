import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompletionStatusModule } from '../completionStatus/completionStatus.module';
import { WorkshopScore } from './workshop-score.entity';
import { WorkshopScoreService } from './workshop-score.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkshopScore]), CompletionStatusModule],
  exports: [WorkshopScoreService],
  controllers: [],
  providers: [WorkshopScoreService],
})
export class WorkshopScoreModule {}
