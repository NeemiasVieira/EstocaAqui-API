import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './update-user.dto';
import { User } from '../../user.model';
import { hash } from 'bcrypt';

@Injectable()
export class UpdateUserService {
    async updateUser(id: string, usuarioAtualizado : UpdateUserDto) : Promise<User>{
        
        const usuario = await User.findOne({where: {id}});

        if(!usuario) throw new HttpException("Usuário não encontrado", 404);

        usuarioAtualizado.senha = await hash(usuarioAtualizado.senha, Number(process.env.PASSWORD_SALT));

        Object.keys(usuarioAtualizado).forEach((chave) => {
            usuario[chave] = usuarioAtualizado[chave];
        })

        await usuario.save();

        return usuario;

    }
}
