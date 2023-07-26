import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CustomBaseEntity {
  @CreateDateColumn({ name: 'APP_CREATE_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'APP_CREATE_USER_GUID', type: 'varchar', length: 36, readonly: true })
  createdByUserGuid?: string;

  @Column({ name: 'APP_CREATE_USER_ID', type: 'varchar', length: 30, readonly: true })
  createdByUserId?: string;

  @UpdateDateColumn({ name: 'APP_LAST_UPDATE_TIMESTAMP' })
  updatedAt: Date;

  // TO-DO: add relation, not quite sure what this guid is yet
  @Column({ name: 'APP_LAST_UPDATE_USER_GUID', type: 'varchar', length: 36 })
  lastUpdatedByUserGuid?: string;

  @Column({ name: 'APP_LAST_UPDATE_USER_ID', type: 'varchar', length: 30 })
  lastUpdatedByUserId?: string;

  // @VersionColumn()
  // version: number;
}
