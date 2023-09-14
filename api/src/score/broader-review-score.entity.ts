import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import { Application } from '../application/application.entity';
import { CompletionStatus } from '../completionStatus/completionStatus.entity';
import { ScoreBaseEntity } from '../common/score-base.entity';
import { User } from '../user/user.entity';

@Entity({
  name: 'BCAT_BROADER_REVIEW_SCORE',
})
export class BroaderReviewScore extends ScoreBaseEntity {
  @PrimaryGeneratedColumn({ name: 'BROADER_REVIEW_SCORE_ID' })
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'USER_ID' })
  user: User;

  @ManyToOne(() => Application)
  @JoinColumn({ name: 'APPLICATION_ID' })
  application: Application;

  @ManyToOne(() => CompletionStatus)
  @JoinColumn({ name: 'COMPLETION_STATUS_ID' })
  completionStatus?: CompletionStatus;
}
