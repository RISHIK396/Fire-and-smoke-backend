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
import { ConfigModule } from '@nestjs/config';
import { AlertController } from './alert/alert.controller';
import { AlertService } from './alert/alert.service';
import { AlertModule } from './alert/alert.module';
import { SmsService } from './sms/sms.service';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [PrismaModule,DetectionModule, AuthModule,UploadModule, DevicesModule, ReportModule,ConfigModule.forRoot({
      isGlobal: true, // 👈 VERY IMPORTANT
    }), AlertModule, SmsModule,],
  controllers: [AppController, TestController, AlertController],
  providers: [AppService,PrismaService, TestGateway, AlertService, SmsService],
})
export class AppModule {}
