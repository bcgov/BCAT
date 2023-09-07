import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompletionStatusController } from './completionStatus.controller';
import { CompletionStatus } from './completionStatus.entity';
import { CompletionStatusService } from './completionStatus.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompletionStatus])],
  exports: [CompletionStatusService],
  controllers: [CompletionStatusController],
  providers: [CompletionStatusService],
})
export class CompletionStatusModule {}
