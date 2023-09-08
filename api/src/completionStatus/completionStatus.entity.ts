import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'BCAT_COMPLETION_STATUS',
})
export class CompletionStatus {
  @PrimaryGeneratedColumn({ name: 'COMPLETION_STATUS_ID' })
  id: number;

  @Column({ name: 'NAME', type: 'varchar', length: 10, unique: true })
  name?: string;
}
