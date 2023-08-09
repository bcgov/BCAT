import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Application } from '../application/application.entity';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity({
  name: 'BCAT_FORM_METADATA',
})
export class FormMetaData extends CustomBaseEntity {
  @PrimaryGeneratedColumn({ name: 'FORM_METADATA_ID' })
  id: number;

  @Column({ name: 'NAME', type: 'varchar', length: '200', nullable: false })
  name: string;

  @Column({ name: 'DESCRIPTION', type: 'varchar', length: '2000', nullable: false, default: '' })
  description: string;

  @Column({ name: 'ACTIVE', type: 'boolean', nullable: false, default: true })
  active: boolean;

  @Column({ name: 'CHEFS_FORM_ID', type: 'uuid', nullable: false })
  chefsFormId: string;

  @Column({ name: 'VERSION_ID', type: 'uuid', nullable: false })
  versionId: string;

  @Column({ name: 'VERSION_SCHEMA', type: 'jsonb', nullable: false })
  versionSchema: any;

  @OneToMany(() => Application, (application) => application.form)
  applications: Application[];
}
