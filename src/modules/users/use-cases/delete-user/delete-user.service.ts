import { HttpException, Injectable } from '@nestjs/common';
import { User } from '../../user.model';

@Injectable()
export class DeleteUserService {
  async DeleteUser(id: string) {
    const usuarioExiste = await User.findOne({ where: { id } });

    if (!usuarioExiste) throw new HttpException('Usuário não encontrado', 404);

    await User.destroy({ where: { id } });
  }
}
