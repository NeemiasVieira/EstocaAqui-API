import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UpdateUsuarioDto } from './update-usuario.dto';
import { Usuario } from '../../usuario.model';
import { hash } from 'bcrypt';

@Injectable()
export class UpdateUsuarioService {

    private readonly logger = new Logger("UpdateUsuarioService")

    async updateUsuario(id: string, usuarioAtualizado : UpdateUsuarioDto) : Promise<Usuario>{

        this.logger.log(`Tentativa de atualização do usuário ${id}`);
        
        const usuario = await Usuario.findOne({where: {id}});

        if(!usuario){
            this.logger.error("404 - Usuário não encontrado");
            throw new HttpException("Usuário não encontrado", 404);  
        } 

        usuarioAtualizado.senha = await hash(usuarioAtualizado.senha, Number(process.env.PASSWORD_SALT));

        Object.keys(usuarioAtualizado).forEach((chave) => {
            usuario[chave] = usuarioAtualizado[chave];
        })

        await usuario.save();

        this.logger.verbose(`200 - Usuário${id} atualizado`);

        return usuario;

    }
}
