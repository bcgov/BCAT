import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './attachment.entity';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>
  ) {}

  async getAttachment(chefsId: string): Promise<Attachment> {
    return this.attachmentRepository.findOne({ where: { chefsId } });
  }

  async updateAttachment(attachment: Attachment): Promise<Attachment> {
    attachment.updateConcurrencyControlNumber();
    return await this.attachmentRepository.save({ ...attachment });
  }

  async createOrUpdateAttachment(attachment: Attachment): Promise<Attachment> {
    const foundAttachment = await this.getAttachment(attachment.chefsId);
    if (!foundAttachment) {
      Logger.log('-- Attachment not found, creating');

      return this.createAttachment(attachment);
    }
    Logger.log('-- Attachment exists, updating');
    return this.updateAttachment(attachment);
  }

  async createAttachment(attachment: Attachment): Promise<Attachment> {
    attachment.updateConcurrencyControlNumber();
    const newAttachment = this.attachmentRepository.create(attachment);

    return await this.attachmentRepository.save(newAttachment);
  }

  async getAllAttachments(withData = true) {
    const qb = this.attachmentRepository.createQueryBuilder('attachment');

    if (!withData) {
      qb.where('attachment.data IS NULL ');
    }

    return qb.getMany();
  }
}
