/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { GetReportDto } from './report.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('report')
export class ReportController {
    constructor(
        private reportService : ReportService
    ){}
    
    @Get()
    @UseGuards(AuthGuard('jwt'))
    getAllReports(@Query() query:GetReportDto){
        const data =  this.reportService.getAllReports(query);
        return data;
    }
}

