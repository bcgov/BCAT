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
  @Max(10)
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
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  projectNeedScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  projectFundingScore: number;

  @IsNumber()
  @Max(3)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  pastBcaapFundingScore: number;

  @IsNumber()
  @IsIn([0, 2])
  @IsOptional()
  @IsEmpty()
  facilityMasterPlanScore: number;

  @IsNumber()
  @Max(2)
  @Min(1)
  @IsOptional()
  @IsEmpty()
  facilityUsageScore: number;

  @IsNumber()
  @Max(3)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  trafficDataScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  climatePerspectiveScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  climateBestPracticesScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  environmentalRisksScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  environmentalInnovationScore: number;

  @IsNumber()
  @Max(2)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  projectDescriptionScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  climateGoalsScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  organizationClimateGoalScore: number;

  @IsNumber()
  @Max(5)
  @Min(0)
  @IsOptional()
  @IsEmpty()
  successMeasurementScore: number;

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
