/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import cloudinary from 'cloudinary.config';

@Injectable()
export class LocalStorageService {
  async upload(file: Express.Multer.File) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'fire-detection',
    });

    return {
      fileName: result.public_id,
      path: result.secure_url,
      url: result.secure_url, // ✅ directly usable in frontend
    };
  }

  async delete(publicId: string) {
    await cloudinary.uploader.destroy(publicId);
  }
}
