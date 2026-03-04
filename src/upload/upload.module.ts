/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from '../prisma/prisma.service';
import { LocalStorageService } from './storage/local-storage.service';

@Module({
  controllers: [UploadController],
  providers: [
    UploadService,
    PrismaService,
    {
      provide: 'StorageProvider',
      useClass: LocalStorageService, // 👈 change here to switch storage
    },
  ],
  exports: [UploadService],  //this will enable this file to be used in any api across this project
})
export class UploadModule {}