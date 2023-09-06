import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Application } from './application.entity';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationStatusModule } from '../applicationStatus/applicaitonStatus.module';
import { BroaderReviewScoreModule } from '../score/broader-review-score.module';
import { CommentModule } from '../comments/comment.module';
import { UserModule } from '../user/user.module';
import { WorkshopScoreModule } from '../score/workshop-score.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    ApplicationStatusModule,
    BroaderReviewScoreModule,
    CommentModule,
    UserModule,
    WorkshopScoreModule,
  ],
  exports: [ApplicationService],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
