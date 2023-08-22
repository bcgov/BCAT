import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { FormMetaData } from '../FormMetaData/formmetadata.entity';
import { User } from '../user/user.entity';
import { Comment } from '../comments/comment.entity';
import { ApplicationStatus } from './constants';
import { RemovableBaseEntity } from '../common/removable-base.entity';

@Entity({
  name: 'BCAT_APPLICATION',
})
export class Application extends RemovableBaseEntity {
  @PrimaryGeneratedColumn({ name: 'APPLICATION_ID' })
  id: number;

  @Column({ name: 'SUBMISSION', type: 'jsonb', nullable: false })
  // It's dynamic, so putting any here
  submission: any;

  @Column({ name: 'APPLICATION_TYPE', type: 'varchar', length: '100', nullable: true })
  applicationType: string;

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

  @Column({
    name: 'STATUS',
    type: 'varchar',
    length: '100',
    nullable: false,
    default: ApplicationStatus.RECEIVED,
  })
  status: ApplicationStatus;

  @ManyToOne(() => FormMetaData, (form) => form.applications)
  @JoinColumn({ name: 'FORM_METADATA_ID' })
  form: FormMetaData;

  // Might belong to multiple users in the future, so
  // change to ManyToMany accordingly if needed.
  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: 'ASSIGNED_TO_USER_ID' })
  assignedTo: User;

  @OneToMany(() => Comment, (comment) => comment.application)
  comments: Comment[];
}
