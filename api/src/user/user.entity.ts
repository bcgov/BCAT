import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Application } from '@/application/application.entity';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity({
  name: 'BCAT_USER',
})
export class User extends CustomBaseEntity {
  @PrimaryGeneratedColumn({ name: 'USER_ID' })
  id: number;

  @Column({ name: 'USER_NAME', type: 'varchar', length: 100, unique: true })
  userName?: string;

  @Column({ name: 'DISPLAY_NAME', type: 'varchar', length: 200, unique: true })
  displayName?: string;

  @Index()
  @Column({ name: 'USER_GUID', type: 'uuid', nullable: false, unique: true })
  userGuid: string;

  @Column({ name: 'IS_AUTHORIZED', type: 'bool', nullable: false, default: false })
  isAuthorized: boolean;

  @Column({ name: 'IS_ADMIN', type: 'bool', nullable: false, default: false })
  isAdmin: boolean;

  @OneToMany(() => Application, (application) => application.assignedTo)
  applications: Application[];
}
