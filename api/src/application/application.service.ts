import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { SaveApplicationDto } from '../common/dto/save-application.dto';
import { GetApplicationsDto } from '../common/dto/get-applications.dto';
import { Repository } from 'typeorm';
import { PaginationRO } from '../common/ro/pagination.ro';
import { FormMetaData } from '../FormMetaData/formmetadata.entity';
import { UserService } from '../user/user.service';
import { AssignToUserDto } from '../common/dto/assign-to-user.dto';
import { Comment } from '../comments/comment.entity';
import { CommentDto } from '../comments/dto/comment.dto';
import { User } from '../user/user.entity';
import { CommentResultRo } from './ro/app-comment.ro';
import { CommentService } from '../comments/comment.service';
import { GenericException } from '../common/generic-exception';
import { ApplicationError } from './application.errors';
import { UpdateStatusDto } from './dto/update-status.dto';
import { BroaderReviewScoreService } from '../score/broader-review-score.service';
import { ScoreDto } from '../score/dto/score.dto';
import { WorkshopScoreService } from '../score/workshop-score.service';
import { ApplicationFinalScoreRO } from './ro/application-score.ro';
import { RawDataRo } from '@/score/ro/raw-data.ro';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    private userService: UserService,
    private commentService: CommentService,
    private broaderScoreService: BroaderReviewScoreService,
    private workshopScoreService: WorkshopScoreService
  ) {}

  async getApplications(query: GetApplicationsDto): Promise<PaginationRO<Application>> | null {
    const queryBuilder = this.applicationRepository
      .createQueryBuilder('app')
      .leftJoinAndSelect('app.assignedTo', 'assignedTo');

    if (query.applicationType) {
      queryBuilder.andWhere('app.applicationType ILIKE :applicationType', {
        applicationType: `%${query.applicationType}%`,
      });
    }

    if (query.confirmationId) {
      queryBuilder.andWhere('LOWER(app.confirmationId) = LOWER(:confirmationId)', {
        confirmationId: query.confirmationId,
      });
    }

    if (query.totalCost) {
      queryBuilder.andWhere('app.totalEstimatedCost = :totalCost', {
        totalCost: query.totalCost,
      });
    }

    if (query.orderBy) {
      queryBuilder.orderBy({ [`app.${query.orderBy}`]: query.order });
    }

    query.filter(queryBuilder);

    const applications = await queryBuilder.getManyAndCount();

    return new PaginationRO<Application>(applications);
  }

  async getApplication(applicationId: number): Promise<Application> {
    const application = await this.applicationRepository.findOne(applicationId, {
      relations: ['assignedTo', 'form', 'lastUpdatedBy'],
    });
    if (!application) {
      throw new GenericException(ApplicationError.APPLICATION_NOT_FOUND);
    }
    return application;
  }

  async createApplication(
    applicationDto: SaveApplicationDto,
    formMetaData: FormMetaData
  ): Promise<Application> {
    const application = this.applicationRepository.create(applicationDto);
    application.form = formMetaData;

    return await this.applicationRepository.save(application);
  }

  async updateApplication(
    applicationId: number,
    applicationDto: SaveApplicationDto
  ): Promise<void> {
    await this.applicationRepository.update(applicationId, applicationDto);
  }

  async assignToUser(
    applicationId: number,
    assignToUserDto: AssignToUserDto,
    loggedInUser: User
  ): Promise<void> {
    const application = await this.getApplication(applicationId);
    const user = await this.userService.getUser(assignToUserDto.userId);
    application.assignedTo = user;
    application.lastUpdatedByUserId = loggedInUser.userName;
    await this.applicationRepository.save(application);
  }

  async unassignUser(applicationId: number, loggedInUser: User): Promise<void> {
    const application = await this.getApplication(applicationId);
    // simplified for now, but if there are multiple users that
    // can be assigned/unassigned - will need to include the passed
    // user ID's.
    application.assignedTo = null;
    application.lastUpdatedByUserId = loggedInUser.userName;
    await this.applicationRepository.save(application);
  }

  async getComments(applicationId: number): Promise<CommentResultRo> {
    const res = await this.commentService.getAllComments(applicationId);
    if (res.length > 0) {
      return new CommentResultRo(res);
    }
    return;
  }

  async createComment(applicationId: number, commentDto: CommentDto, user: User): Promise<Comment> {
    const application = await this.getApplication(applicationId);
    return await this.commentService.createComment(commentDto, application, user);
  }

  async updateStatus(applicationId: number, statusDto: UpdateStatusDto, user: User): Promise<void> {
    const application = await this.getApplication(applicationId);
    const { status } = statusDto;
    //
    if (application.status === status) {
      return;
    }

    // TODO: Should audit the changes on who updated the status
    await this.applicationRepository.update(applicationId, {
      status,
      lastUpdatedByUserId: user.userName,
    });
    await this.unassignUser(applicationId, user);
  }

  // Broader Review Score Section
  async getBroaderReviewScores(applicationId: number) {
    return this.broaderScoreService.getBroaderReviewScores(applicationId);
  }

  async createBroaderReviewScore(user: User, applicationId: number, scoreDto: ScoreDto) {
    const application = await this.getApplication(applicationId);

    return this.broaderScoreService.createBroaderReviewScore(user, application, scoreDto);
  }
  async updateBroaderReviewScore(
    user: User,
    applicationId: number,
    scoreId: string,
    scoreDto: ScoreDto
  ) {
    const application = await this.getApplication(applicationId);

    return this.broaderScoreService.updateBroaderReviewScore(user, application, scoreId, scoreDto);
  }

  // Workshop Score Section
  async getWorkshopScores(applicationId: number) {
    return this.workshopScoreService.getWorkshopScoreForApplication(applicationId);
  }

  async createWorkshopScore(user: User, applicationId: number, scoreDto: ScoreDto) {
    const application = await this.getApplication(applicationId);

    return this.workshopScoreService.createWorkshopScore(user, application, scoreDto);
  }
  async updateWorkshopScore(applicationId: number, scoreId: string, scoreDto: ScoreDto) {
    const application = await this.getApplication(applicationId);

    return this.workshopScoreService.updateWorkshopScore(application, scoreId, scoreDto);
  }

  async getApplicationDetailsForPDF(applicationId: number): Promise<ApplicationFinalScoreRO> {
    const workshopScore = await this.workshopScoreService.getApplicationDetailsWithFinalScore(
      applicationId
    );

    if (!workshopScore) {
      throw new GenericException(ApplicationError.APPLICATION_NOT_SCORED);
    }

    return new ApplicationFinalScoreRO(workshopScore);
  }

  async getRawData(): Promise<any> {
    const applicationsWithFinalScores =
      await this.workshopScoreService.getApplicationsWithFinalScores();
    return new RawDataRo(applicationsWithFinalScores).result;
  }
}
