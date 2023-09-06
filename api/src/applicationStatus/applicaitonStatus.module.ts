import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationStatusController } from './applicationStatus.controller';
import { ApplicationStatus } from './applicationStatus.entity';
import { ApplicationStatusService } from './applicationStatus.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationStatus])],
  exports: [ApplicationStatusService],
  controllers: [ApplicationStatusController],
  providers: [ApplicationStatusService],
})
export class ApplicationStatusModule {}
