/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { CreateDetectionEntry } from './dto/detection.dto';
import { v7 as uuidv7 } from 'uuid';
import { UUID } from 'crypto';
import { ReportService } from '../report/report.service';

@Injectable()
export class DetectionService {
    constructor(private prisma: PrismaService,
        private upload: UploadService,
        private reportService: ReportService
    ) { }

    async registerDetection(
        body: CreateDetectionEntry,
        file?: Express.Multer.File,
    ) {
        try {
            const {
                deviceId,
                temperature,
                smokeLevel,
                mlConfidence,
                sensorTriggered,
            } = body;
            const checkExist = await this.prisma.device.findFirst({
                where: { id: deviceId }
            });
            if (!checkExist) {
                throw new NotFoundException("No such Device Found in the database");
            }

            let fileRecord: any = null;
            // first detection is created 
            const detection = await this.prisma.detection.create({
                data: {
                    temperature,
                    smokeLevel,
                    mlConfidence,
                    deviceId,
                    sensorTriggered,
                    id: uuidv7()
                }
            });

            // 📁 If file exists → use UploadService
            if (!file) {
                throw new BadRequestException("Image file is required");
            }

            const uploaded = await this.upload.saveFileData(file, detection.id as UUID);
            fileRecord = uploaded.data;

            const finalDetection = await this.prisma.detection.findUnique({
                where: { id: detection.id },
                include: {
                    files: true
                }
            });
            // now here we will send the 
            if (
                finalDetection &&
                mlConfidence != null &&
                (mlConfidence > 0.8 || sensorTriggered)
            ) {
                await this.reportService.createReportFromDetection(finalDetection);
            }
            if (finalDetection) {
                return {
                    detectionId: finalDetection.id,
                    temperature: finalDetection.temperature,
                    smokeLevel: finalDetection.smokeLevel,
                    mlConfidence: finalDetection.mlConfidence,
                    createdAt: finalDetection.createdAt,
                    imageUrls: finalDetection.files.map(file => file.url)
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // async getDetections(q)
}
