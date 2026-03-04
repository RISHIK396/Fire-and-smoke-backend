/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!:string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!:string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!:string;
}