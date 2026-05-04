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
import { DetectionGateway } from './detection.gateway';
import { SmsService } from 'src/sms/sms.service';

@Injectable()
export class DetectionService {
    constructor(private prisma: PrismaService,
        private upload: UploadService,
        private reportService: ReportService,
        private gateway:DetectionGateway,
         private smsService: SmsService
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

            const uploaded = await this.upload.saveFileData(file, detection.id);
            fileRecord = uploaded.data;

            const finalDetection = await this.prisma.detection.findUnique({
                where: { id: detection.id },
                include:{
                    files:true,
                    device:{
                        include:{
                            user:true
                        }
                    }
                }
                

            });
            // now here we will send the 
            if (
                finalDetection &&
                mlConfidence != null &&
                (mlConfidence > 0.8 || sensorTriggered)
            ) {
                await this.reportService.createReportFromDetection(finalDetection);
                const link = `https://smart-anomaly-detector-liard.vercel.app/alert/${finalDetection.alertToken}`;
                const rawPhone = finalDetection.device.user.phone;

                const phone = rawPhone.startsWith("+91")
                ? rawPhone
                : `+91${rawPhone}`;
                console.log("📲 Final phone:", phone);
                console.log("🔗 Alert link:", link);
                try {
                    await this.smsService.sendAlert(
                        phone,
                        link,
                        finalDetection.device.location ?? 'Unknown Location'
                    );

                    console.log("✅ SMS Triggered");

                    } 
                    catch (err) {
                        console.error("❌ SMS Failed:");
                    }
            }
            // hello
            if (finalDetection) {
                const alert =  {
                    deviceId:finalDetection.device.id,
                    temperature: finalDetection.temperature,
                    smokeLevel: finalDetection.smokeLevel,
                    mlConfidence: finalDetection.mlConfidence,
                    createdAt: finalDetection.createdAt,
                    image: finalDetection.files[0]?.url,
                    deviceName:finalDetection.device.name,
                    location:finalDetection.device.location,
                }
                this.gateway.sendFireAlert(alert);
                return alert;

            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // async getDetections(q)
}
