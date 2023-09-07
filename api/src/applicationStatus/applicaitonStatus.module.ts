import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationStatus } from './applicationStatus.entity';
import { ApplicationStatusService } from './applicationStatus.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationStatus])],
  exports: [ApplicationStatusService],
  controllers: [],
  providers: [ApplicationStatusService],
})
export class ApplicationStatusModule {}
