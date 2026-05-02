/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlertService {
    constructor(
        private prisma: PrismaService
    ){}

    async getAllData(alertToken:string){
        try {
            const isExist = await this.prisma.detection.findFirst({
                where:{
                    alertToken
                }
            });

            if(!isExist){
                throw NotFoundException;
            }

            const detection = await this.prisma.detection.findFirst({
                where:{
                    alertToken
                },
                include:{
                    device:true,
                    files:true
                    // report:true
                }
            });
            return {
                deviceName: detection!.device.name,
                location: detection!.device.location,
                temperature: detection!.temperature,
                image: detection!.files?.[0]?.url,
                createdAt: detection!.createdAt
            };

        }

        catch(err){
            console.error(err);
            throw err;
        }
    }
}
