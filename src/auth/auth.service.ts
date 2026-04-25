/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import { v7 as uuidv7 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }
    async createUser(body: CreateUserDto) {
        const { name, password, email,phone } = body;
        const emailExists = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (emailExists) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // user is not exists,creating new user
        const user = await this.prisma.user.create({
            data: {
                id: uuidv7(),
                name,
                password: hashedPassword,
                email,
                phone
            }
        });

        const jwtPayload = {
            sub: user.id,
            email: user.email,
        }
        const token =  this.jwtService.sign(jwtPayload);

        const payload = {
            userId: user.id,
            name: user.name,
            email: user.email,
            phone:user.phone,
            token
        }
        return payload;
    }

    async login(body: LoginUserDto) {
        try {
            const { email, password } = body;
            const userExists = await this.prisma.user.findFirst({
                where: {
                    email: email
                }
            });

            if (!userExists) {
                throw new NotFoundException('User not Found');
            }
            const isPasswordValid = await bcrypt.compare(password, userExists.password);

            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid Credentials');
            }

            const jwtPayload = {
                sub: userExists.id,
                email: userExists.email,
            }
            const token = this.jwtService.sign(jwtPayload);
            const payload = {
                UserId: userExists.id,
                name: userExists.name,
                email: userExists.email,
                token: token
            }

            return payload;
        }
        catch (error) {
            console.error(error);
            throw error;

        }
    }
}
