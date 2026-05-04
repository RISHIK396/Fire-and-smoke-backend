/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { Logger } from '@nestjs/common';

const logger = new Logger('SmsService');
@Injectable()
export class SmsService {
    private client;

    constructor() {
        this.client = new Twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
    }

    async sendAlert(phone: string, link: string, location: string) {
        logger.log("Called the message sending thing Twilio");

        await this.client.messages.create({
            body: `🚨 FIRE ALERT!
Location: ${location}
Open immediately: ${link}`,
            from: process.env.TWILIO_PHONE,
            to: phone
        });
        logger.log("Message sent");
    }
}
