import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Application } from '../application/application.entity';
import { CustomBaseEntity } from '../common/custom-base.entity';
import { User } from '../user/user.entity';

@Entity({
  name: 'BCAT_COMMENT',
})
export class Comment extends CustomBaseEntity {
  @PrimaryGeneratedColumn({ name: 'COMMENT_ID' })
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'USER_ID' })
  user: User;

  @Column({ name: 'OVERALL_COMMENTS', type: 'varchar', length: 2000 })
  comment?: string;

  @ManyToOne(() => Application, (application) => application.comments)
  @JoinColumn({ name: 'APPLICATION_ID' })
  application: Application;
}
