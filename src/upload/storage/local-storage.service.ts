/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { StorageProvider } from './storage.interface';

@Injectable()
export class LocalStorageService implements StorageProvider {
  async upload(file: Express.Multer.File) {
    if (!file.path || !file.filename) {
      throw new Error('File upload failed, file.path or file.filename missing');
    }

    const fileName = file.filename;
    const publicUrl = `C:/uploads/${fileName}`; // can also use BASE_URL if needed

    return { fileName, path: file.path, url: publicUrl };
  }

  async delete(filePath: string) {
    const fs = await import('fs');
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
}