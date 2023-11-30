import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './update-user.dto';
import { User } from '../../user.model';
import { hash } from 'bcrypt';

@Injectable()
export class UpdateUserService {
    async updateUser(id: string, usuarioAtualizado : UpdateUserDto) : Promise<User>{
        
        const usuario = await User.findOne({where: {id}});

        if(!usuario) throw new HttpException("Usuário não encontrado", 404);

        usuarioAtualizado.password = await hash(usuarioAtualizado.password, Number(process.env.PASSWORD_SALT));
        const { username, fullName, password, phoneNumber } = usuarioAtualizado

        if(username) usuario.username = username;
        if(fullName) usuario.fullName = fullName;
        if(password) usuario.password = password;
        if(phoneNumber) usuario.phoneNumber = phoneNumber;
        await usuario.save();

        return usuario;

    }
}
