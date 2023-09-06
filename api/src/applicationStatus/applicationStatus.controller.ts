import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';

import { ApplicationStatus } from './applicationStatus.entity';
import { ApplicationStatusService } from './applicationStatus.service';

@ApiBearerAuth()
@Controller('applicationStatus')
@ApiTags('applicationStatus')
export class ApplicationStatusController {
  constructor(private applicationStatusService: ApplicationStatusService) {}

  @Get()
  getApplicationStatuses(): Promise<ApplicationStatus[]> {
    return this.applicationStatusService.getApplicationStatuses();
  }

  @Get('/:id')
  getApplicationStatus(@Param('id') statusId: number): Promise<ApplicationStatus> {
    return this.applicationStatusService.getApplicationStatus(statusId);
  }
}
