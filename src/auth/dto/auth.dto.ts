/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

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

  @IsNotEmpty()
@IsString()
@Matches(/^[0-9]{10}$/, {
  message: 'Mobile number must be exactly 10 digits'
})
phone!: string;

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