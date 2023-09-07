import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationType } from './applicationType.entity';
import { ApplicationTypeService } from './applicationType.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationType])],
  exports: [ApplicationTypeService],
  controllers: [],
  providers: [ApplicationTypeService],
})
export class ApplicationTypeModule {}
