/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// create-user.dto.ts
import { IsString, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDeviceDto {
    @IsNotEmpty()
    @IsString()
    name!:string;

    @IsNotEmpty()
    @IsString()
    location!:string;

    @IsNotEmpty()
    @Type(() => Number)   // 👈 converts string → number
    @IsNumber()
    latitude!:number;

    @IsNotEmpty()
    @Type(() => Number)   // 👈 converts string → number
    @IsNumber()
    longitude!:number;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId!:string;
}

export class GetAllDevicesDto {
    @IsNotEmpty()
    @IsUUID()
    userId!:string;


}

export class DeleteDeviceDto{
    @IsNotEmpty()
    @IsUUID()
    deviceId!:string;
}