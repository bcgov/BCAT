import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { OrderByOptions, ApplicationSortOptions } from '../enums';
import { PaginationDto } from './pagination.dto';

export class GetApplicationsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @MinLength(0)
  confirmationId: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @MinLength(0)
  applicationType: string;

  @IsOptional()
  @IsString()
  assignedTo: number;

  @IsOptional()
  @IsEnum(OrderByOptions)
  order = OrderByOptions.ASC;

  @ApiPropertyOptional({ enum: ApplicationSortOptions })
  @IsOptional()
  @IsEnum(ApplicationSortOptions)
  orderBy = ApplicationSortOptions.SUBMISSION_ID;

  @IsOptional()
  @IsString()
  totalCost: number;
}
