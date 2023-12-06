import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from './update-usuario.dto';
import { Usuario } from '../../usuario.model';
import { hash } from 'bcrypt';

@Injectable()
export class UpdateUsuarioService {
    async updateUsuario(id: string, usuarioAtualizado : UpdateUsuarioDto) : Promise<Usuario>{
        
        const usuario = await Usuario.findOne({where: {id}});

        if(!usuario) throw new HttpException("Usuário não encontrado", 404);

        usuarioAtualizado.senha = await hash(usuarioAtualizado.senha, Number(process.env.PASSWORD_SALT));

        Object.keys(usuarioAtualizado).forEach((chave) => {
            usuario[chave] = usuarioAtualizado[chave];
        })

        await usuario.save();

        return usuario;

    }
}
