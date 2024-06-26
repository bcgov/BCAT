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
  @MaxLength(100)
  @MinLength(0)
  applicationType: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  @MinLength(0)
  applicantName: string;

  @IsOptional()
  @IsString()
  assignedTo: string;

  @IsOptional()
  @IsEnum(OrderByOptions)
  order = OrderByOptions.DESC;

  @ApiPropertyOptional({ enum: ApplicationSortOptions })
  @IsOptional()
  @IsEnum(ApplicationSortOptions)
  orderBy = ApplicationSortOptions.FUNDING_YEAR;

  @IsOptional()
  @IsString()
  totalCost: string;

  @IsOptional()
  @IsString()
  fundingYear: string;

  @IsOptional()
  @IsString()
  status: string;
}
