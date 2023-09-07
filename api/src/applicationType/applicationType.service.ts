import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ApplicationType } from './applicationType.entity';
import { ApplicationTypeError } from './applicationType.errors';
import { GenericException } from '../common/generic-exception';

@Injectable()
export class ApplicationTypeService {
  constructor(
    @InjectRepository(ApplicationType)
    private applicationTypeRepository: Repository<ApplicationType>
  ) {}

  async getApplicationType(id: number): Promise<ApplicationType> {
    const applicationType = await this.applicationTypeRepository.findOne(id);
    if (!applicationType) {
      throw new GenericException(ApplicationTypeError.APPLICATION_TYPE_NOT_FOUND);
    }
    return applicationType;
  }

  async getApplicationTypeByName(name: string): Promise<ApplicationType> {
    const applicationType = await this.applicationTypeRepository.findOne({
      where: {
        name,
      },
    });
    if (!applicationType) {
      throw new GenericException(ApplicationTypeError.APPLICATION_TYPE_NOT_FOUND);
    }
    return applicationType;
  }

  async addApplicationType(data: Partial<ApplicationType>): Promise<ApplicationType> {
    return this.applicationTypeRepository.save(this.applicationTypeRepository.create(data));
  }

  async getApplicationTypes(): Promise<ApplicationType[]> {
    return await this.applicationTypeRepository.createQueryBuilder().limit(50).getMany();
  }
}
