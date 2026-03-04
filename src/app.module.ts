/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { DetectionModule } from './detection/detection.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { DevicesModule } from './devices/devices.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [PrismaModule,DetectionModule, AuthModule,UploadModule, DevicesModule, ReportModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
