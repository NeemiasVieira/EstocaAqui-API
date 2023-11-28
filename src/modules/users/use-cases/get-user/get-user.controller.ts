import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../user.model';
import { GetUserService } from './get-user.service';

@Controller('get-user')
@ApiTags("Usuarios")
export class GetUserController {

    constructor(private readonly appservice : GetUserService){}

    @Get()
    @ApiOperation({summary: "Lista um ou todos os usuários"})
    @ApiResponse({status: 200, description: "Retorna um usuário ou uma lista com todos os usuários"})
    async getUsers(@Query("id") id : string) : Promise<User | User[]> {
        return await this.appservice.getUsers(id);
    }

}
