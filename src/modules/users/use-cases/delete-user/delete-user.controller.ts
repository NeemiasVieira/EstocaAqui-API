import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteUserService } from './delete-user.service';

@ApiTags('Usuarios')
@Controller('delete-user')
export class DeleteUserController {
  constructor(private readonly appservice: DeleteUserService) {}

  @Delete('/:id')
  @ApiOperation({summary: "Exclusão de Usuário"})
    @ApiResponse({
        status: 200,
        description: 'Usuário Excluído com sucesso',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
    })

  async deleteUser(@Param('id') id: string) {
    await this.appservice.DeleteUser(id);
  }
}
