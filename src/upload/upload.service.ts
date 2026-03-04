/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { StorageProvider } from './storage/storage.interface';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class UploadService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('StorageProvider') private readonly storage: StorageProvider,
  ) {}

  async saveFileData(file: Express.Multer.File, detectionId: string | null = null) {
    if (!file) throw new Error('No file received');

    const uploaded = await this.storage.upload(file);

    const savedFile = await this.prisma.file.create({
      data: {
        id: uuidv7(),
        originalName: file.originalname,
        fileName: uploaded.fileName, // must exist
        mimeType: file.mimetype,
        size: file.size,
        path: uploaded.path, // must exist
        url: uploaded.url,
        detectionId,
      },
    });

    return {
      success: true,
      message: 'File uploaded successfully',
      data: savedFile,
    };
  }
}