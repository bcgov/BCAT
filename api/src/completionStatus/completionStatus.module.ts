import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompletionStatus } from './completionStatus.entity';
import { CompletionStatusService } from './completionStatus.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompletionStatus])],
  exports: [CompletionStatusService],
  controllers: [],
  providers: [CompletionStatusService],
})
export class CompletionStatusModule {}
