import { Application } from '@/application/application.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'BCAT_APPLICATION_TYPE',
})
export class ApplicationType {
  @PrimaryGeneratedColumn({ name: 'APPLICATION_TYPE_ID' })
  id: number;

  @Column({ name: 'NAME', type: 'varchar', length: 10, unique: true })
  name?: string;

  @OneToMany(() => Application, (application) => application.applicationType)
  applications: Application[];
}
