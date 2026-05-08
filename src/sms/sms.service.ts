/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private client: Twilio;
  private logger = new Logger(SmsService.name);

  constructor() {
    this.logger.log('Initializing Twilio');

    this.logger.log(process.env.TWILIO_ACCOUNT_SID || 'NO SID');
    this.logger.log(process.env.TWILIO_PHONE || 'NO PHONE');

    this.client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async sendAlert(phone: string, link: string, location: string) {
    try {
      this.logger.log('Sending SMS...');

      const response = await this.client.messages.create({
        body: `🚨 FIRE ALERT!
Location: ${location}
Open immediately: ${link}`,

        from: process.env.TWILIO_PHONE,
        to: phone,
      });

      this.logger.log(`Message sent: ${response.sid}`);
    } catch (error) {
      this.logger.error('TWILIO ERROR');
      this.logger.error(error);
    }
  }
}