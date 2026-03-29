/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { TestGateway } from './test.gateway';

@Controller('test')
export class TestController {
    constructor(private gateway:TestGateway){}
    
    @Get()

    trigger(){
        const fakeUserId = "user123";
       this.gateway.sendToUser(fakeUserId,{
        msg:"🔥 Fire detected!"
       });
       return "sent to a specific user";
    }
}
