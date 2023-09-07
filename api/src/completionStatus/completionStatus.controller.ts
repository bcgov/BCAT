import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';

import { CompletionStatus } from './completionStatus.entity';
import { CompletionStatusService } from './completionStatus.service';

@ApiBearerAuth()
@Controller('completionStatus')
@ApiTags('completionStatus')
export class CompletionStatusController {
  constructor(private applicationStatusService: CompletionStatusService) {}

  @Get()
  getCompletionStatuses(): Promise<CompletionStatus[]> {
    return this.applicationStatusService.getCompletionStatuses();
  }

  @Get('/:id')
  getCompletionStatus(@Param('id') statusId: number): Promise<CompletionStatus> {
    return this.applicationStatusService.getCompletionStatus(statusId);
  }
}
