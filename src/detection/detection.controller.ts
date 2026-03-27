/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateDetectionEntry } from './dto/detection.dto';
import { DetectionService } from './detection.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import { AuthGuard } from '@nestjs/passport';
import { multerOptions } from 'src/upload/multer.config';

@Controller('detection')
// @UseGuards(AuthGuard('jwt'))
export class DetectionController {
    constructor(private detection: DetectionService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file',multerOptions))
    async createDetection(
        @UploadedFile() file: Express.Multer.File,
        @Body('body') bodyString: string,   // JSON comes as string
    ) {
        const body: CreateDetectionEntry = JSON.parse(bodyString); // parse into DTO
        return this.detection.registerDetection(body, file);
    }

    // @Get()
    // getDetection(): string {
        // return awair this.pr
    // }
}
