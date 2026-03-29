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
import { TestGateway } from './test/test.gateway';
import { TestController } from './test/test.controller';

@Module({
  imports: [PrismaModule,DetectionModule, AuthModule,UploadModule, DevicesModule, ReportModule],
  controllers: [AppController, TestController],
  providers: [AppService,PrismaService, TestGateway],
})
export class AppModule {}
