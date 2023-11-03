import axios from 'axios';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Application } from '../../application/application.entity';
import { ApplicationService } from '../../application/application.service';
import { ApplicationType, REQUEST_METHODS } from '../../common/constants';
import { ApplicationTypeService } from '../../applicationType/applicationType.service';
import { Attachment } from '../../attachments/attachment.entity';
import { AttachmentService } from '../../attachments/attachment.service';
import { AxiosOptions } from '../../common/interfaces';
import { AxiosResponseTypes } from '../../common/enums';
import { DatabaseError } from '../database.error';
import { extractObjects, getGenericError } from '../../common/utils';
import { FormMetaData } from '../../FormMetaData/formmetadata.entity';
import { FormMetaDataDto } from '../../common/dto/form-metadata.dto';
import { GenericException } from '../../common/generic-exception';
import { SaveApplicationDto } from '../../common/dto/save-application.dto';
import { SyncDataError } from './sync-chefs-data.errors';

const CHEFS_BASE_URL = 'https://submit.digital.gov.bc.ca/app/api/v1';
const FILE_URL = 'https://submit.digital.gov.bc.ca';
const MAX_PROJECT_TITLE_LENGTH = 300;

@Injectable()
export class SyncChefsDataService {
  constructor(
    @InjectRepository(Application)
    private applicationRepo: Repository<Application>,
    @InjectRepository(FormMetaData)
    private formMetadataRepo: Repository<FormMetaData>,
    private applicationTypeService: ApplicationTypeService,
    private appService: ApplicationService,
    private attachmentService: AttachmentService
  ) {}

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
    for (let i = 0; i < args.length; i++) {
      if (args[i].includes('token=')) {
        const parts = args[i].split('=');
        if (parts.length > 0 && parts[1]) {
          return parts[1];
        }
      }
    }

    throw new GenericException(DatabaseError.TOKEN_NOT_FOUND);
  }

  private getSubmissionIdsFromArgs(args: string[]) {
    for (let i = 0; i < args.length; i++) {
      if (args[i].includes('submissionIds=')) {
        const parts = args[i].split('=');
        if (parts.length > 0 && parts[1]) {
          return parts[1].split(',').filter((arr) => arr.length > 0);
        }
        break;
      }
    }

    return [];
  }

  private getFormIdFromArgs(args: string[]) {
    for (let i = 0; i < args.length; i++) {
      if (args[i].includes('formId=')) {
        const parts = args[i].split('=');
        if (parts.length > 0 && parts[1]) {
          return parts[1];
        }
        break;
      }
    }

    return '';
  }

  async updateAttachments(data?: any) {
    // Axios stuff
    const method = REQUEST_METHODS.GET;
    // Make sure you include the -- token=<token> into the script args
    const token = data?.token || this.getTokenFromArgs(process.argv);
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
    if (!token) Logger.error(`No TOKEN found`);

    for (const file of files) {
      try {
        Logger.log(`Fetching attachment - ${file.id}`);
        // Get file data form server
        const url = FILE_URL + file.url;
        const fileRes = await axios({ ...options, url });
        Logger.log(`File fetched successfully - ${file.id}`);
        const fileData = Buffer.from(fileRes.data);
        Logger.log(`Buffer extracted successfully - ${file.id}`);
        file.data = fileData;
        await this.attachmentService.updateAttachment(file);
      } catch (error) {
        Logger.error(
          `Error occurred fetching attachment - ${file.id} - `,
          JSON.stringify(getGenericError(error))
        );
        Logger.error(error);
        Logger.error(SyncDataError.SYNC_ATTACHMENT_ERROR);
        // throw new GenericException(SyncDataError.SYNC_ATTACHMENT_ERROR);
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
        chefsId: file.data.id,
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
      let type = '';
      let applicantName = '';

      const submissionResponse = await axios(axiosOptions);
      const responseData = submissionResponse.data.submission;

      if (formId === process.env.INFRASTRUCTURE_FORM) {
        // infrastructure form
        applicantName = responseData.submission.data.s1Container.s1LegalNameOfGovernmentApplicant;
        type = ApplicationType.INFRASTRUCTURE_FORM;
        attachments = responseData.submission.data.s10Container;
        projectTitle = responseData.submission.data.s4Container.s4ProjectTitle;
      } else if (formId === process.env.NETWORK_FORM) {
        // network form
        applicantName = responseData.submission.data.s1Container.s1LegalName;
        type = ApplicationType.NETWORK_FORM;
        attachments = responseData.submission.data.s9Container;
        projectTitle = responseData.submission.data.s3Container.s3ProjectTitle;
      } else {
        Logger.log(`Form ID: ${formId} is not a valid form. \nSkipping...`);
        return;
      }

      const applicationType = await this.applicationTypeService.getApplicationTypeByName(type);

      const dbSubmission = await this.applicationRepo.findOne({
        where: { submissionId: submissionId },
      });

      const newSubmissionData: SaveApplicationDto = {
        applicationType: applicationType,
        applicantName: applicantName,
        submissionId: submissionId,
        submission: responseData.submission.data,
        confirmationId: responseData.confirmationId,
        projectTitle: projectTitle.substring(0, MAX_PROJECT_TITLE_LENGTH),
        totalEstimatedCost: responseData.submission.data.s8Container.s8TotalEstimatedProjectCost,
        asks: responseData.submission.data.s8Container.s8GrantRequest,
      };

      // update submission
      if (dbSubmission) {
        Logger.log('Submission exists: updating');
        await this.appService.updateApplication(dbSubmission.id, newSubmissionData);
        return;
      }

      // create submission
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
      const application = await this.appService.createApplication(newSubmissionData, formMetaData);

      // Process attachments
      await this.createOrUpdateAttachments(attachments, application.id);
    } catch (e) {
      Logger.error(
        `Error occurred fetching submission - ${submissionId} - `,
        JSON.stringify(getGenericError(e))
      );
    }
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
    const submissionIds = this.getSubmissionIdsFromArgs(process.argv);
    const formId = this.getFormIdFromArgs(process.argv);
    const password =
      formId === process.env.INFRASTRUCTURE_FORM
        ? process.env.INFRASTRUCTURE_FORM_API_KEY
        : process.env.NETWORK_FORM_API_KEY;

    const method = REQUEST_METHODS.GET;
    const options = {
      method,
      auth: {
        username: formId,
        password,
      },
    };

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

  private async getFormSubmissions(formId: string, options): Promise<void> {
    try {
      const formResponse = await axios({
        ...options,
        url: this.getFormUrl(formId),
      });
      const submissionIds = formResponse.data
        .filter(
          (submission) => submission.formSubmissionStatusCode === 'SUBMITTED' && !submission.deleted
        )
        .map((submission) => submission.submissionId);

      if (submissionIds && submissionIds.length > 0) {
        this.getSubmissionsFromIds(formId, submissionIds, options);
        return;
      }
      Logger.log(`No submissions found in the form with ID ${formId}. \nSkipping...`);
    } catch (e) {
      Logger.error(
        `Error occurred fetching form - ${formId} - `,
        JSON.stringify(getGenericError(e))
      );
      throw new GenericException(SyncDataError.SYNC_DATA_ERROR);
    }
  }

  async syncChefsData(): Promise<void> {
    const method = REQUEST_METHODS.GET;
    const INFRASTRUCTURE_FORM_ID = process.env.INFRASTRUCTURE_FORM;
    const INFRASTRUCTURE_FORM_API_KEY = process.env.INFRASTRUCTURE_API_KEY;
    const NETWORK_FORM_ID = process.env.NETWORK_FORM;
    const NETWORK_FORM_API_KEY = process.env.NETWORK_API_KEY;

    const infrastructureOptions = {
      method,
      auth: {
        username: INFRASTRUCTURE_FORM_ID,
        password: INFRASTRUCTURE_FORM_API_KEY,
      },
    };

    const networkOptions = {
      method,
      auth: {
        username: NETWORK_FORM_ID,
        password: NETWORK_FORM_API_KEY,
      },
    };

    await this.getFormSubmissions(INFRASTRUCTURE_FORM_ID, infrastructureOptions);
    await this.getFormSubmissions(NETWORK_FORM_ID, networkOptions);
  }

  async softDeleteApplications(): Promise<void> {
    try {
      await this.applicationRepo.createQueryBuilder('application').softDelete().execute();
    } catch (error) {
      Logger.error(`Error occurred deleting application - `, error);
    }
  }
}
