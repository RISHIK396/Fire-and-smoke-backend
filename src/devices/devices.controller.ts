/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Query, UseGuards,Get, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DevicesService } from './devices.service';
import { CreateDeviceDto, DeleteDeviceDto, GetAllDevicesDto } from './dto/devices.dto';
import { Logger } from '@nestjs/common';

const logger = new Logger('DevicesController');

@Controller('devices')
export class DevicesController {

    constructor(private devices:DevicesService){}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    createDevice(@Body() body:CreateDeviceDto,){
        logger.log("controller called",body);
        return this.devices.createDevice(body);
    }


    @Get()
    @UseGuards(AuthGuard('jwt'))
    getAllDevices(@Query() query:GetAllDevicesDto){
        return this.devices.getAllDevices(query);
    } 

    @Get('/total')
    @UseGuards(AuthGuard('jwt'))
    getNoDevices(@Query() query:GetAllDevicesDto){
        return this.devices.getNoDevices(query);
    } 
    
    @Get('/active')
    @UseGuards(AuthGuard('jwt'))
    getActiveDevices(@Query() query:GetAllDevicesDto){
        return this.devices.getActiveDevices(query);
    }

    @Post('/delete')
    @UseGuards(AuthGuard('jwt'))
    deleteActiveDevices(@Body() body:DeleteDeviceDto){
        return this.devices.deleteActiveDevice(body);
    }
}
