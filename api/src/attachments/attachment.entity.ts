import { Entity, Column, PrimaryColumn } from 'typeorm';
import { CustomBaseEntity } from '../common/custom-base.entity';

@Entity({
  name: 'BCAT_ATTACHMENT',
})
export class Attachment extends CustomBaseEntity {
  @PrimaryColumn({ name: 'ATTACHMENT_ID', type: 'integer', nullable: false })
  id: number;

  @Column({ name: 'APPLICATION_ID', type: 'integer', nullable: false })
  applicationId: number;

  @Column({ name: 'URL', type: 'varchar', length: '200', nullable: false, unique: true })
  url: string;

  // nullable for now
  // String doesn't work for AxiosResponse type
  @Column({ name: 'DATA', type: 'bytea', nullable: true })
  data?: Buffer;

  @Column({ name: 'ORIGINAL_NAME', type: 'varchar', length: '200', nullable: false })
  originalName: string;
}
