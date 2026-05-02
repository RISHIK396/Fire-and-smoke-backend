/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class GetDataAlert{
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    alertToken!:string;
}