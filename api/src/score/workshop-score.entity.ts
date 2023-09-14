import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

import { Application } from '../application/application.entity';
import { CompletionStatus } from '../completionStatus/completionStatus.entity';
import { ScoreBaseEntity } from '../common/score-base.entity';
import { User } from '../user/user.entity';

@Entity({
  name: 'BCAT_WORKSHOP_SCORE',
})
export class WorkshopScore extends ScoreBaseEntity {
  @PrimaryGeneratedColumn({ name: 'WORKSHOP_SCORE_ID' })
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'USER_ID' })
  user: User;

  @OneToOne(() => Application, (application) => application.id)
  @JoinColumn({ name: 'APPLICATION_ID' })
  application: Application;

  @ManyToOne(() => CompletionStatus)
  @JoinColumn({ name: 'COMPLETION_STATUS_ID' })
  completionStatus?: CompletionStatus;
}
