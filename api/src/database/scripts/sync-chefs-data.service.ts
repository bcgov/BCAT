import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from '../../application/application.entity';
import { REQUEST_METHODS } from '../../common/constants';
import { ApplicationService } from '../../application/application.service';
import { SaveApplicationDto } from '../../common/dto/save-application.dto';
import { AxiosOptions } from '../../common/interfaces';
import { FormMetaData } from '../../FormMetaData/formmetadata.entity';
import { FormMetaDataDto } from '../../common/dto/form-metadata.dto';
import { extractObjects, getGenericError } from '../../common/utils';
import { AttachmentService } from '../../attachments/attachment.service';
import { Attachment } from '../../attachments/attachment.entity';
import { AxiosResponseTypes } from '../../common/enums';
import { GenericException } from '../../common/generic-exception';
import { DatabaseError } from '../database.error';

const CHEFS_BASE_URL = 'https://submit.digital.gov.bc.ca/app/api/v1';
const FILE_URL = 'https://submit.digital.gov.bc.ca';
const MAX_PROJECT_TITLE_LENGTH = 300;

@Injectable()
export class SyncChefsDataService {
  CHEFS_FORM_IDS: string[];
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
    @InjectRepository(FormMetaData)
    private readonly formMetadataRepo: Repository<FormMetaData>,
    private readonly appService: ApplicationService,
    private readonly attachmentService: AttachmentService
  ) {
    this.CHEFS_FORM_IDS = JSON.parse(process.env.CHEFS_FORM_IDS);
  }

  private getFormUrl(formId: string): string {
    return `${CHEFS_BASE_URL}/forms/${formId}/submissions`;
  }
  private getSubmissionUrl(submissionId: string): string {
    return `${CHEFS_BASE_URL}/submissions/${submissionId}`;
  }

  private async createOrFindFormMetadata(data: FormMetaDataDto): Promise<FormMetaData> {
    const form = await this.formMetadataRepo.findOne({
      where: { chefsFormId: data.chefsFormId, versionId: data.versionId },
    });
    if (form) {
      Logger.log('FormMetaData exists: fetching');
      return form;
    }
    Logger.log("FormMetaData doesn't exist: creating");
    return await this.formMetadataRepo.save(this.formMetadataRepo.create(data));
  }

  private getTokenFromArgs(args: string[]) {
    if (args[3] && args[3].includes('token=')) {
      const parts = args[3].split('=');
      if (parts[0]) {
        if (parts[1]) {
          return parts[1];
        }
      }
    }
    throw new GenericException(DatabaseError.TOKEN_NOT_FOUND);
  }

  private getSubmissionIdsFromArgs(args: string[]) {
    if (args[4] && args[4].includes('submissionIds=')) {
      const parts = args[4].split('=');
      if (parts[0]) {
        if (parts[1]) {
          return parts[1].split(',').filter((arr) => arr.length > 0);
        }
      }
    }
    return [];
  }

  private getFormIdFromArgs(args: string[]) {
    const formArgs = args[5];
    if (formArgs && formArgs.includes('formId=')) {
      const parts = formArgs.split('=');
      if (parts[0] && parts[1]) {
        return parts[1];
      }
    }
    return '';
  }

  async updateAttachments() {
    // Axios stuff
    const method = REQUEST_METHODS.GET;
    // Make sure you include the -- token=<token> into the script args
    const token = this.getTokenFromArgs(process.argv);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const responseType = AxiosResponseTypes.ARRAY_BUFFER;
    const options = {
      method,
      headers,
      responseType,
    };
    const files = await this.attachmentService.getAllAttachments(false);

    for (const file of files) {
      try {
        Logger.log(`Fetching attachment - ${file.id}`);
        // Get file data form server
        const url = FILE_URL + file.url;
        const fileRes = await axios({ ...options, url });
        const fileData = Buffer.from(fileRes.data);

        await this.attachmentService.updateAttachment({ ...file, data: fileData });
      } catch (error) {
        Logger.error(
          `Error occurred fetching attachment - ${file.id} - `,
          JSON.stringify(getGenericError(error))
        );
      }
    }
  }

  private async createOrUpdateAttachments(data, applicationId: number) {
    const responseDataFileArrays = Object.values(data).filter(
      (value) => Array.isArray(value) && value.length > 0
    );
    const objects = extractObjects(responseDataFileArrays, 5);
    // TODO:
    // Maybe there's a better way to check it
    const files = objects.filter((obj) => 'url' in obj && 'data' in obj);

    files.forEach(async (file) => {
      const newAttachmentData = {
        url: file.url,
        originalName: file.originalName,
        applicationId: applicationId,
        data: file.data,
      } as Attachment;

      await this.attachmentService.createOrUpdateAttachment(newAttachmentData);
    });
  }

  private async createOrUpdateSubmission(
    formId: string,
    submissionId: string,
    axiosOptions: AxiosOptions
  ): Promise<void> {
    try {
      let projectTitle = '';
      let attachments = '';

      const submissionResponse = await axios(axiosOptions);
      const responseData = submissionResponse.data.submission;

      if (formId === process.env.INFRASTRUCTURE_FORM) {
        // infrastructure form
        projectTitle = responseData.submission.data.s4Container.s4ProjectTitle;
        attachments = responseData.submission.data.s10Container;
      } else if (formId === process.env.NETWORK_FORM) {
        // network form
        projectTitle = responseData.submission.data.s3Container.s3ProjectTitle;
        attachments = responseData.submission.data.s9Container;
      } else {
        Logger.log(`Form ID: ${formId} is not a valid form. \nSkipping...`);
        return;
      }

      const dbSubmission = await this.applicationRepo.findOne({
        where: { submissionId: submissionId },
      });

      const newSubmissionData: SaveApplicationDto = {
        submissionId: submissionId,
        submission: responseData.submission.data,
        confirmationId: responseData.confirmationId,
        projectTitle: projectTitle.substring(0, MAX_PROJECT_TITLE_LENGTH),
        totalEstimatedCost: responseData.submission.data.s8Container.s8TotalEstimatedProjectCost,
        asks: responseData.submission.data.s8Container.s8GrantRequest,
      };

      if (dbSubmission) {
        Logger.log('Submission exists: updating');
        await this.appService.updateApplication(dbSubmission.id, newSubmissionData);
      } else {
        Logger.log("Submission doesn't exist: creating");

        Logger.log('Processing FormMetadata');
        const newFormData: FormMetaDataDto = {
          name: submissionResponse.data.form.name,
          description: submissionResponse.data.form.description,
          active: submissionResponse.data.form.active,
          chefsFormId: submissionResponse.data.form.id,
          versionId: submissionResponse.data.version.id,
          versionSchema: submissionResponse.data.version.schema,
        };
        const formMetaData = await this.createOrFindFormMetadata(newFormData);

        const application = await this.appService.createApplication(
          newSubmissionData,
          formMetaData
        );

        // Process attachments
        await this.createOrUpdateAttachments(attachments, application.id);
      }
    } catch (e) {
      Logger.error(
        `Error occurred fetching submission - ${submissionId} - `,
        JSON.stringify(getGenericError(e))
      );
    }
  }

  private getHeadersFromToken(token: string) {
    return {
      'Content-Type': 'application/x-www-formid-urlencoded',
      Authorization: `Bearer ${token}`,
    };
  }

  private getSubmissionsFromIds(formId: string, submissionIds: string[], options) {
    submissionIds.forEach((submissionId) => {
      this.createOrUpdateSubmission(formId, submissionId, {
        ...options,
        url: this.getSubmissionUrl(submissionId),
      });
    });
  }

  async syncSubmissions(): Promise<void> {
    const method = REQUEST_METHODS.GET;
    const token = this.getTokenFromArgs(process.argv);
    const headers = this.getHeadersFromToken(token);
    const options = {
      method,
      headers,
    };
    const submissionIds = this.getSubmissionIdsFromArgs(process.argv);
    const formId = this.getFormIdFromArgs(process.argv);

    try {
      if (submissionIds && submissionIds.length > 0) {
        this.getSubmissionsFromIds(formId, submissionIds, options);
      } else {
        Logger.log(`No submission ID's provided. \nSkipping...`);
        return;
      }
    } catch (e) {
      Logger.error(
        `Error occurred fetching submissions with ID's - ${submissionIds} - `,
        JSON.stringify(getGenericError(e))
      );
    }
  }

  async syncChefsData(): Promise<void> {
    const method = REQUEST_METHODS.GET;
    const token = this.getTokenFromArgs(process.argv);
    const headers = this.getHeadersFromToken(token);

    this.CHEFS_FORM_IDS.forEach(async (formId) => {
      const options = {
        method,
        headers,
      };

      try {
        const formResponse = await axios({ ...options, url: this.getFormUrl(formId) });
        const submissionIds = formResponse.data
          .filter(
            (submission) =>
              submission.formSubmissionStatusCode === 'SUBMITTED' && !submission.deleted
          )
          .map((submission) => submission.submissionId);

        if (submissionIds && submissionIds.length > 0) {
          this.getSubmissionsFromIds(formId, submissionIds, options);
        } else {
          Logger.log(`No submissions with found in the form with ID ${formId}. \nSkipping...`);
          return;
        }
      } catch (e) {
        Logger.error(
          `Error occurred fetching form - ${formId} - `,
          JSON.stringify(getGenericError(e))
        );
      }
    });
  }

  async softDeleteApplications(): Promise<void> {
    try {
      await this.applicationRepo.createQueryBuilder('application').softDelete().execute();
    } catch (error) {
      Logger.error(`Error occurred deleting application - `, error);
    }
  }
}
