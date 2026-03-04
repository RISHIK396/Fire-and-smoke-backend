/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DetectionService } from './detection.service';
import { DetectionController } from './detection.controller';
import { UploadModule } from 'src/upload/upload.module';
import { ReportModule } from 'src/report/report.module';

@Module({
  imports: [UploadModule,ReportModule],
  providers: [DetectionService],
  controllers: [DetectionController]
})
export class DetectionModule {}
