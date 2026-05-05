/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeviceDto, DeleteDeviceDto, GetAllDevicesDto } from './dto/devices.dto';
import { v7 as uuidv7 } from 'uuid';
import { Logger } from '@nestjs/common';

const logger = new Logger('DevicesService');

@Injectable()
export class DevicesService {
    constructor(private prisma: PrismaService) { }

    // first here we are registering the device with respect to a particular user
    async createDevice(body: CreateDeviceDto) {
        const { userId, name, location, latitude, longitude } = body;
        try {
            logger.log("Function called");
            const device = await this.prisma.user.findUnique({
                where: {
                    id: userId
                }
            });

            if (!device) {
                throw new NotFoundException('User not found');
            }

            const newDevice = await this.prisma.device.create({
                data: {
                    id: uuidv7(),
                    name,
                    location,
                    longitude,
                    latitude,
                    userId
                }
            })
            return {
                id: newDevice.id,
                name: newDevice.name,
                location: newDevice.location,
                longitude: newDevice.longitude,
                latitude: newDevice.latitude,
                userId: newDevice.userId
            };
        }
        catch (error) {
            console.error("🔥 FULL ERROR STACK:");
            console.error(error);
            throw error;
        }
    }

    // this will get all the devices that are registered for a particular user

    async getAllDevices(query: GetAllDevicesDto) {
        try {
            const { userId } = query;
            const exist = await this.prisma.device.findFirst({
                where: {
                    userId
                }
            });
            if (!exist) {
                throw new NotFoundException("No Devices For this user");
            }

            const devices = await this.prisma.device.findMany({
                where: {
                    userId
                },
                select: {
                    id: true,
                    name: true,
                    location: true,
                    longitude: true,
                    latitude: true
                }
            });
            return {
                devices
            }
        } catch (error) {
            logger.error('🔥 ERROR:', error);
            throw error;
        }
    }

    async getNoDevices(query: GetAllDevicesDto) {
        try {
            const { userId } = query;
            const total = await this.prisma.device.count({
                where: {
                    userId
                }
            });
            return total;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getActiveDevices(query: GetAllDevicesDto) {
        try {
            const { userId } = query;
            const active = await this.prisma.device.count({
                where: {
                    userId,
                    isActive: true
                }
            });
            return active;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async deleteActiveDevice(body: DeleteDeviceDto) {
        try {
            const { deviceId } = body;
            const isExisting = await this.prisma.device.findFirst({
                where: {
                    id: deviceId
                }
            });

            if (!isExisting) {
                throw new NotFoundException("No such Device Found");
            }

            const deleteDevice = await this.prisma.device.update({
                where: {
                    id: deviceId
                },
                data: {
                    isActive: false
                }
            });
            return{
                deletion:true
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

}

