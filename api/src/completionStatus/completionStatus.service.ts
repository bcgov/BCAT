import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompletionStatus } from './completionStatus.entity';
import { CompletionStatusError } from './completionStatus.errors';
import { GenericException } from '../common/generic-exception';

@Injectable()
export class CompletionStatusService {
  constructor(
    @InjectRepository(CompletionStatus)
    private statusRepository: Repository<CompletionStatus>
  ) {}

  async getCompletionStatus(id: number): Promise<CompletionStatus> {
    const status = await this.statusRepository.findOne(id);
    if (!status) {
      throw new GenericException(CompletionStatusError.COMPLETION_STATUS_NOT_FOUND);
    }
    return status;
  }

  async getCompletionStatusByName(name: string): Promise<CompletionStatus> {
    const status = await this.statusRepository.findOne({
      where: {
        name,
      },
    });
    if (!status) {
      throw new GenericException(CompletionStatusError.COMPLETION_STATUS_NOT_FOUND);
    }
    return status;
  }

  async addCompletionStatus(data: Partial<CompletionStatus>): Promise<CompletionStatus> {
    return this.statusRepository.save(this.statusRepository.create(data));
  }

  async getCompletionStatuses(): Promise<CompletionStatus[]> {
    return await this.statusRepository.createQueryBuilder().limit(50).getMany();
  }
}
