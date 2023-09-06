import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ApplicationStatus } from './applicationStatus.entity';
import { ApplicationStatusError } from './applicationStatus.errors';
import { GenericException } from '../common/generic-exception';

@Injectable()
export class ApplicationStatusService {
  constructor(
    @InjectRepository(ApplicationStatus)
    private statusRepository: Repository<ApplicationStatus>
  ) {}

  async getApplicationStatus(id: number): Promise<ApplicationStatus> {
    const status = await this.statusRepository.findOne(id);
    if (!status) {
      throw new GenericException(ApplicationStatusError.APPLICATION_STATUS_NOT_FOUND);
    }
    return status;
  }

  async getApplicationStatusByName(name: string): Promise<ApplicationStatus> {
    const status = await this.statusRepository.findOne({
      where: {
        name,
      },
    });
    if (!status) {
      throw new GenericException(ApplicationStatusError.APPLICATION_STATUS_NOT_FOUND);
    }
    return status;
  }

  async addApplicationStatus(data: Partial<ApplicationStatus>): Promise<ApplicationStatus> {
    return this.statusRepository.save(this.statusRepository.create(data));
  }

  async getApplicationStatuses(): Promise<ApplicationStatus[]> {
    return await this.statusRepository.createQueryBuilder().limit(50).getMany();
  }
}
