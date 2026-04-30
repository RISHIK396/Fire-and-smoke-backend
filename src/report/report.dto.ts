/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class GetReportDto{
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId!:string
}