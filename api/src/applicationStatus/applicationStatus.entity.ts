import { Application } from '@/application/application.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity({
  name: 'BCAT_STATUS',
})
export class ApplicationStatus {
  @PrimaryGeneratedColumn({ name: 'STATUS_ID' })
  id: number;

  @Column({ name: 'NAME', type: 'varchar', length: 10, unique: true })
  name?: string;

  @OneToMany(() => Application, (application) => application.status)
  applications: Application[];
}
