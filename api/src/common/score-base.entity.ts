import { Column } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

export class ScoreBaseEntity extends CustomBaseEntity {
  @Column({ name: 'DATA', type: 'jsonb', nullable: true })
  data?: any;

  @Column({ name: 'FINAL_SCORE', type: 'integer' })
  finalScore?: number;

  @Column({
    name: 'OVERALL_COMMENTS',
    type: 'varchar',
    length: 2000,
  })
  overallComments?: string;
}
