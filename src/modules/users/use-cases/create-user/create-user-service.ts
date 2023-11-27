import { HttpException, Injectable } from '@nestjs/common';
import { User } from '../../user.model';
import { CreateUserDto } from './create-user-dto';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserService {
  async createUser(newUser: CreateUserDto): Promise<User> {

    const userAlreadyExists = await User.findOne({ where: { email: newUser.email } });

    if (userAlreadyExists) throw new HttpException("User already exists, try again!", 400);

    newUser.password = await hash(newUser.password, Number(process.env.PASSWORD_SALT));

    const newClient = await User.create({ ...newUser });
    return newClient


  }
}