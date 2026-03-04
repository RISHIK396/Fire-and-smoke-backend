/* eslint-disable prettier/prettier */
import {
    IsNotEmpty,
    IsUUID,
    IsNumber,
    IsBoolean,
    IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDetectionEntry {

    @IsNotEmpty()
    @IsUUID()
    deviceId!: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    temperature!: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    smokeLevel!: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    mlConfidence?: number;

    @IsNotEmpty()
    @Type(() => Boolean)
    @IsBoolean()
    sensorTriggered!: boolean;
}