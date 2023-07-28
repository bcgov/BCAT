import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, Column } from 'typeorm';
import { Application } from '../application/application.entity';
import { ScoreBaseEntity } from '../common/score-base.entity';
import { User } from '../user/user.entity';
import { CompletionStatus } from '@/common/enums';

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

  @Column({
    name: 'COMPLETION_STATUS',
    type: 'varchar',
    nullable: false,
    length: 30,
    default: CompletionStatus.IN_PROGRESS,
  })
  completionStatus?: CompletionStatus;
}
