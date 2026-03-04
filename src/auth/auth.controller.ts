/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() body: CreateUserDto, @Res() res) {
        const payload = await this.authService.createUser(body);
        try {
            res.status(201).json({
                success: true,
                message: 'User Created Successfully',
                data: payload
            });
        }
        catch (error) {
            console.log(error);
            throw new Error('Failed to create user');
        }
    }

    @Post('login')
    async login(@Body() body: LoginUserDto, @Res() res) {
        const payload = await this.authService.login(body);
        res.status(200).json({
            success: true,
            message: "User Logged in Sucessfully",
            data: payload
        });
    }
}
