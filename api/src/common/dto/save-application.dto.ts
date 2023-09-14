import { ApplicationType } from '../../applicationType/applicationType.entity';

export interface SaveApplicationDto {
  applicantName: string;
  applicationType: ApplicationType;
  submissionId: string;
  submission: any; // dynamic
  confirmationId: string;
  projectTitle: string;
  totalEstimatedCost: string;
  asks: string;
}
