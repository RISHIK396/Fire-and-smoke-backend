/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Detection } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetReportDto } from './report.dto';

@Injectable()
export class ReportService {
    constructor(private prisma: PrismaService) { }
    async createReportFromDetection(detection: Detection) {
        const device = await this.prisma.device.findUnique({
            where: { id: detection.deviceId }
        });

        if (!device) {
            throw new NotFoundException("No such Device Found in the data base");
        }

        const report = await this.prisma.report.create({
            data: {
                severity: "HIGH",
                latitude: device.latitude ?? 0,
                longitude: device.longitude ?? 0,
                deviceId: device.id,
                userId: device.userId,
                detections: {
                    connect: { id: detection.id }
                }
            }
        });
        return {
            data:{
                report
            }
        }
    }

    async getAllReports(query: GetReportDto) {
        // first check whether the user exists
        try {
            const { userId } = query;
            const isExist = await this.prisma.user.findUnique({
                where: {
                    id: userId
                }
            });
            if (!isExist) {
                throw new NotFoundException("No such Such User Found in the Database");
            }
            const report = await this.prisma.report.findMany({
                where : {
                    userId
                },
                select:{
                    id:true,
                    severity:true,
                    status:true,
                    longitude:true,
                    latitude:true,
                    deviceId:true,
                    createdAt:true,
                    device:{
                        select:{
                            name:true,
                            location:true
                        }
                    },
                    detections:{
                        select:{
                            mlConfidence:true,
                            temperature:true,
                            smokeLevel:true,
                            sensorTriggered:true,
                            files:{
                                select:{
                                    url:true,
                                    createdAt:true
                                }
                            }

                        },
                    }
                }
            });
            
            return report;
        }
        catch (err) {
            console.error("🔥 Full Error:", err);
            throw err;
        }
    }
}
