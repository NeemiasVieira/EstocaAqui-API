import { Injectable } from '@nestjs/common';
import { User } from '../../user.model';

@Injectable()
export class GetUserService {
      
  async getUsers(id: string): Promise<User | User[]> {
    if (id) {
      const user = await User.findOne({ where: { id } });
      return user;
    }

    return await User.findAll();
  }
}
