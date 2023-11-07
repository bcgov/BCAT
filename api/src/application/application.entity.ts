import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApplicationStatus } from '../applicationStatus/applicationStatus.entity';
import { ApplicationType } from '../applicationType/applicationType.entity';
import { Comment } from '../comments/comment.entity';
import { FormMetaData } from '../FormMetaData/formmetadata.entity';
import { RemovableBaseEntity } from '../common/removable-base.entity';
import { User } from '../user/user.entity';
import { WorkshopScore } from '@/score/workshop-score.entity';

@Entity({
  name: 'BCAT_APPLICATION',
})
export class Application extends RemovableBaseEntity {
  @PrimaryGeneratedColumn({ name: 'APPLICATION_ID' })
  id: number;

  @Column({ name: 'SUBMISSION', type: 'jsonb', nullable: false })
  // It's dynamic, so putting any here
  submission: any;

  @ManyToOne(() => ApplicationType, (status) => status.applications)
  @JoinColumn({ name: 'APPLICATION_TYPE_ID' })
  applicationType: ApplicationType;

  @Column({ name: 'SUBMISSION_ID', type: 'uuid', nullable: false, unique: true })
  submissionId: string;

  @Column({ name: 'CONFIRMATION_ID', type: 'varchar', length: '30', nullable: false })
  confirmationId: string;

  @Column({ name: 'PROJECT_TITLE', type: 'varchar', length: '100', nullable: false })
  projectTitle: string;

  @Column({ name: 'APPLICANT_NAME', type: 'varchar', length: '300', nullable: true })
  applicantName?: string;

  @Column({ name: 'TOTAL_ESTIMATED_COST', type: 'money' })
  totalEstimatedCost?: string;

  @Column({ name: 'ASKS', type: 'money' })
  asks?: string;

  @ManyToOne(() => ApplicationStatus, (status) => status.applications)
  @JoinColumn({ name: 'STATUS_ID' })
  status: ApplicationStatus;

  @ManyToOne(() => FormMetaData, (form) => form.applications)
  @JoinColumn({ name: 'FORM_METADATA_ID' })
  form: FormMetaData;

  @OneToMany(() => WorkshopScore, (workshopScore) => workshopScore.application)
  @JoinColumn()
  workshopScores?: WorkshopScore[];

  // Might belong to multiple users in the future, so
  // change to ManyToMany accordingly if needed.
  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: 'ASSIGNED_TO_USER_ID' })
  assignedTo: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'APP_LAST_UPDATE_USER_ID' })
  lastUpdatedBy: User;

  @OneToMany(() => Comment, (comment) => comment.application)
  comments: Comment[];
}
