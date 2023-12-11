import { Injectable, Logger } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class DeleteSaidaService {
    constructor(private readonly appService: AppService);
    private readonly loggger = new Logger("DeleteSaidaService");

    async deletaSaida(){

    }
}
