import { Controller, Body, Post } from '@nestjs/common';

import { SUCCESS_RESPONSE, UserRoles } from '../../common/constants';
import { Roles } from '../../common/decorator';
import { SyncChefsDataService } from './sync-chefs-data.service';

@Controller('sync-data')
export class SyncDataController {
  constructor(private syncService: SyncChefsDataService) {}

  @Post()
  @Roles(UserRoles.ADMIN)
  async getChefsData(): Promise<any> {
    await this.syncService.syncChefsData();
    return SUCCESS_RESPONSE;
  }

  @Post('/attachments')
  @Roles(UserRoles.ADMIN)
  async getChefsAttachments(@Body() token: string): Promise<any> {
    await this.syncService.updateAttachments(token);
    return SUCCESS_RESPONSE;
  }
}
