export interface SaveApplicationDto {
  applicationType: string;
  submissionId: string;
  submission: any; // dynamic
  confirmationId: string;
  projectTitle: string;
  totalEstimatedCost: string;
  asks: string;
}
