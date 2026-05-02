/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { AlertService } from './alert.service';

@Controller('alert')
export class AlertController {
    constructor(
        private alert : AlertService
    ){}

    @Get(':token')
    async getDataDetection(@Param('token') token:string){
        return this.alert.getAllData(token);
    }
    
}
