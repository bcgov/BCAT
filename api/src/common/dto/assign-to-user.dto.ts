import { IsNumber } from 'class-validator';

export class AssignToUserDto {
  @IsNumber()
  userId: number;
}
