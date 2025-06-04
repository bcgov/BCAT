import { ApplicationType } from '../../common/constants';
import { WorkshopScore } from '../../score/workshop-score.entity';
import {
  findApplicationType,
  InfrastructureScoreFields,
  NetworkAppScoreFields,
} from '../constants';

type ScoreFieldsType = {
  name: string;
  label: string;
  score: number;
};

export const ApplicationVsDetailsInfo = {};

ApplicationVsDetailsInfo[ApplicationType.INFRASTRUCTURE_FORM] = {
  heading: 'Infrastructure',
  totalScore: 100,
};

ApplicationVsDetailsInfo[ApplicationType.NETWORK_FORM] = {
  heading: 'Network',
  totalScore: 20,
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
    const { form } = application;

    this.confirmationId = application.confirmationId;
    this.applicantName = application.applicantName;
    this.projectTitle = application.projectTitle;
    this.totalCost = `${application.totalEstimatedCost}`;
    this.initialAsk = `${application.asks}`;
    this.overallScore = `${finalScore}`;
    this.comments = overallComments;
    this.applicationType = findApplicationType(form);
    this.scoreData = {};
    // infrastructure form has more complex fields, some are half automated and half manual
    // and some sub sections are combined into one score for print summary (ie. safety)
    if (this.applicationType === ApplicationType.INFRASTRUCTURE_FORM) {
      data.safetyScore += data.AAsafetyScore + data.communityNeedsAndSafetyGuidelinesScore;
      data.landUseScore += data.AAlandUseScore;
      data.populationScore += data.AApopulationScore;
    }

    if (this.applicationType === ApplicationType.NETWORK_FORM) {
      data.s3ComponentsScore += data.AAs3ComponentsScore;
    }

    Object.assign(this.scoreData, data);
    this.fields =
      this.applicationType === ApplicationType.INFRASTRUCTURE_FORM
        ? InfrastructureScoreFields
        : NetworkAppScoreFields;
    this.applicationType = findApplicationType(form);
    this.applicationHeading = ApplicationVsDetailsInfo[this.applicationType].heading;
    this.points = `${(
      finalScore / ApplicationVsDetailsInfo[this.applicationType].totalScore
    ).toFixed(3)}`;
  }
}
