import { Injectable, Inject } from '@nestjs/common';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async findUser(user) {    
    if (user.role === "Soldier") {
      return await this.userRepository.findOne({ where: { name: user.username } })
    }
    return await this.userRepository.findAll<User>();
  }

  async remove(id: number) {
    await this.userRepository.destroy({where:{id: id}})
    return `This action removes a #${id} user`;
  }
}
