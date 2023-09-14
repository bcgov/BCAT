import { Column, DeleteDateColumn } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';

export class RemovableBaseEntity extends CustomBaseEntity {
  @DeleteDateColumn({ name: 'DELETED_AT' })
  deletedAt?: Date;

  @Column({ name: 'DELETED_BY_USER_ID' })
  deletedByUserId?: number;
}
