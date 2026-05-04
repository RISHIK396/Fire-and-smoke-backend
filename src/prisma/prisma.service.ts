/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

const logger = new Logger('PrismaService');

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }
  constructor() {
    logger.log("DB URL:", process.env.DATABASE_URL); 
    
    super({
      datasourceUrl: process.env.DATABASE_URL, // ✅ now this will work
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}