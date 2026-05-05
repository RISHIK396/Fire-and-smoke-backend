/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import path from 'path';
import { Logger } from '@nestjs/common';

const logger = new Logger('authorization');

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() body: CreateUserDto, @Res({ passthrough: true }) res) {
        const payload = await this.authService.createUser(body);
        try {
            const token = payload.token;
            const isProd = process.env.NODE_ENV === "production";

            res.cookie('token', token, {
                httpOnly: true,
                secure: isProd,
                sameSite: isProd ? 'none' : 'lax',
                path: "/",
                maxAge: 24 * 60 * 60 * 1000
            });
            return {
                success: true,
                message: 'User Created Successfully',
                data: payload
            };
        }
        catch (error) {
            logger.error(error);
            throw new Error('Failed to create user');
        }
    }

    @Post('login')
    async login(@Body() body: LoginUserDto, @Res({ passthrough: true }) res) {

        const payload = await this.authService.login(body);
        const data = {
            userId: payload.UserId,
            email: payload.email,
            name: payload.name,
            token: payload.token
        }

        const token = payload.token;
        const isProd = process.env.NODE_ENV === "production";

        res.cookie('token', token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax',
            path: "/",
            maxAge: 24 * 60 * 60 * 1000
        });

        return {
            success: true,
            message: "User Logged in Successfully",
            data: data
        };
    }

    // logout api 
    @Post('logout')
    logout(@Res({ passthrough: true }) res) {

        const isProd = process.env.NODE_ENV === "production";

        res.clearCookie('token', {
            httpOnly: true,
            secure: isProd,              // ✅ match login
            sameSite: isProd ? 'none' : 'lax', // ✅ match login
            path: '/'
        });

        return {
            success: true,
            message: "Logged Out Successfully"
        };
    }
}
