import { UserAccessDto } from '../common/dto/user.dto';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SUCCESS_RESPONSE, UserRoles } from '../common/constants';
import { GetUser, Roles } from '../common/decorator';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller('users')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Patch('/:id/access')
  @Roles(UserRoles.ADMIN)
  async updateUser(
    @Param('id') userId: number,
    @Body() body: UserAccessDto,
    @GetUser() user: User
  ): Promise<any> {
    await this.userService.updateUserAccess(userId, body, user);
    return SUCCESS_RESPONSE;
  }
}
