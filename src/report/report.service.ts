/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Detection } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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
            report
        }
    }
}
