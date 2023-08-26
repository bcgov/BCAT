import { ApplicationType } from '../../common/constants';
import { WorkshopScore } from '../../score/workshop-score.entity';
import { findApplicationType, NetworkAppScoreFields, ScoreFields } from '../constants';

type ScoreFieldsType = {
  name: string;
  label: string;
  criteria?: ApplicationType[];
  score: number;
};

export const ApplicationVsDetailsInfo = {};

ApplicationVsDetailsInfo[ApplicationType.INFRASTRUCTURE_FORM] = {
  heading: 'Infrastructure',
  totalScore: 100,
};

ApplicationVsDetailsInfo[ApplicationType.NETWORK_FORM] = {
  heading: 'Network',
  totalScore: 100,
};

export class ApplicationFinalScoreRO {
  confirmationId: string;

  applicantName: string;

  projectTitle: string;

  totalCost: string;

  initialAsk: string;

  overallScore: string;

  points: string;

  comments: string;

  scoreData: any;

  fields: ScoreFieldsType[];

  applicationHeading: string;

  applicationType: ApplicationType;

  constructor(workshopScore: WorkshopScore) {
    const { application, finalScore, overallComments, data } = workshopScore;
    const { submission, form } = application;

    const appType = findApplicationType(form.chefsFormId);

    this.confirmationId = application.confirmationId;
    this.applicantName = submission.applicantName;
    this.projectTitle = submission.projectTitle;
    this.totalCost = `${application.totalEstimatedCost?.split('.')[0]}.`;
    this.initialAsk = `${application.asks?.split('.')[0]}.`;
    this.overallScore = `${finalScore}`;
    this.comments = overallComments;
    this.scoreData = {};
    Object.assign(this.scoreData, data);
    this.fields =
      application.applicationType === ApplicationType.INFRASTRUCTURE_FORM
        ? InfrastructureScoreFields
        : [];
    this.applicationType = findApplicationType(form.chefsFormId);
    this.applicationHeading = ApplicationVsDetailsInfo[this.applicationType].heading;
    this.points = `${(
      finalScore / ApplicationVsDetailsInfo[this.applicationType].totalScore
    ).toFixed(3)}`;
  }
}
