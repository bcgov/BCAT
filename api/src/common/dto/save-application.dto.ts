export interface SaveApplicationDto {
  applicantName: string;
  applicationType: string;
  submissionId: string;
  submission: any; // dynamic
  confirmationId: string;
  projectTitle: string;
  totalEstimatedCost: string;
  asks: string;
}
