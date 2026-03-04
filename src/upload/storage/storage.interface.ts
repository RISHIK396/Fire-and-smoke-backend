/* eslint-disable prettier/prettier */
export interface StorageProvider {
  upload(file: Express.Multer.File): Promise<{
    fileName: string;
    path: string;
    url: string;
  }>;

  delete(filePath: string): Promise<void>;
}