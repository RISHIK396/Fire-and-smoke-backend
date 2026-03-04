/* eslint-disable prettier/prettier */
import { IsNotEmpty, Max } from 'class-validator';

export class UploadFileDto {
  @IsNotEmpty({ message: 'File is required!' })
  file: any;

  @Max(10 * 1024 * 1024, { message: 'File size must be <= 10MB' }) // optional, will validate manually
    size!: number;
}