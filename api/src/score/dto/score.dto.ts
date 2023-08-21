import { CompletionStatus } from '../../common/enums';

import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class ScoreInfrastructureDataDto {
  @IsNumber()
  @Max(15)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  populationScore: number;

  @IsNumber()
  @Max(15)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  communityNeedsAndSafetyGuidelinesScore: number;

  @IsNumber()
  @Max(23)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  safetyScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  economyAndTourismScore: number;

  @IsNumber()
  @Max(8)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  environmentScore: number;

  @IsNumber()
  @Max(15)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  landUseScore: number;

  @IsNumber()
  @Max(8)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  accessibilityScore: number;

  @IsNumber()
  @Max(3)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  promotionScore: number;

  @IsNumber()
  @Max(3)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  lettersOfSupportScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  previousFundingScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  regionalAdjustmentScore: number;
}

export class ScoreDto {
  @IsOptional()
  data: ScoreInfrastructureDataDto;

  @IsString()
  @MaxLength(2000)
  @MinLength(0)
  @IsOptional()
  overallComments: string;

  @IsNumber()
  @IsOptional()
  @Max(112)
  @Min(0)
  finalScore: number;

  @IsEnum(CompletionStatus)
  completionStatus: CompletionStatus;
}
