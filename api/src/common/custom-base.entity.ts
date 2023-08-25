import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CustomBaseEntity {
  @CreateDateColumn({ name: 'APP_CREATE_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'APP_CREATE_USER_GUID', type: 'varchar', length: 36, readonly: true })
  createdByUserGuid?: string;

  @Column({ name: 'APP_CREATE_USER_ID', type: 'integer' })
  createdByUserId?: number;

  @UpdateDateColumn({ name: 'APP_LAST_UPDATE_TIMESTAMP' })
  updatedAt: Date;

  @Column({ name: 'CONCURRENCY_CONTROL_NUMBER', type: 'integer', default: 0 })
  concurrencyControlNumber: number;

  // TO-DO: add relation, not quite sure what this guid is yet
  @Column({ name: 'APP_LAST_UPDATE_USER_GUID', type: 'varchar', length: 36 })
  lastUpdatedByUserGuid?: string;

  @Column({ name: 'APP_LAST_UPDATE_USER_ID', type: 'integer' })
  lastUpdatedByUserId?: number;

  // audit columns
  @CreateDateColumn({ name: 'DB_AUDIT_CREATE_TIMESTAMP' })
  auditCreatedAt: string;

  @UpdateDateColumn({ name: 'DB_AUDIT_LAST_UPDATE_TIMESTAMP' })
  auditUpdatedAt: Date;

  @Column({ name: 'DB_AUDIT_CREATE_USER_ID', type: 'varchar', length: 30 })
  auditCreatedByUserId?: string;

  @Column({ name: 'DB_AUDIT_LAST_UPDATE_USER_ID', type: 'varchar', length: 30 })
  auditLastUpdatedByUserId?: string;

  // @VersionColumn()
  // version: number;
}
