/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Query, UseGuards,Get, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DevicesService } from './devices.service';
import { CreateDeviceDto, GetAllDevicesDto } from './dto/devices.dto';

@Controller('devices')
export class DevicesController {

    constructor(private devices:DevicesService){}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    createDevice(@Body() body:CreateDeviceDto){
        console.log("controller called",body);
        return this.devices.createDevice(body);
    }


    @Get()
    @UseGuards(AuthGuard('jwt'))
    getAllDevices(@Query() query:GetAllDevicesDto){
        return this.devices.getAllDevices(query);
    } 
    
}
