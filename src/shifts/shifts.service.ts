import { Inject, Injectable } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { Shift } from './entities/shift.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ShiftsService {
  constructor(
    @Inject('SHIFT_REPOSITORY')
        private shiftRepository: typeof Shift,
        @Inject('USER_REPOSITORY')
        private userRepository: typeof User,
  ){}
  async create(createShiftDto: CreateShiftDto, user: any) {
    const newshift = await this.shiftRepository.create({startTime: createShiftDto.startTime, endTime: createShiftDto.endTime, location: createShiftDto.location})
    const myUser: User | null = await this.userRepository.findOne({where: {name: user.username}})
    if (myUser){
      await newshift.$add('Users',myUser.id)
      return await myUser.$get('shifts')
    }
  }

  async createForSoldier(createShiftDto: CreateShiftDto, id: number) {
    const newshift = await this.shiftRepository.create({startTime: createShiftDto.startTime, endTime: createShiftDto.endTime, location: createShiftDto.location})
    const myUser: User | null = await this.userRepository.findOne({where: {id: id["id"]}})    
    if (myUser){
      await newshift.$add('Users',myUser.id)
      return await myUser.$get('shifts')
    } else {
      return `user #${id["id"]} not found.`
    }
  }

  findAll() {
    return this.shiftRepository.findAll();
  }

  async findAllByName(user) {
    const myUser: User | null = await this.userRepository.findOne({where: {name: user.username}})
    if (myUser){
      return await myUser.$get('shifts')
    }
  }


  async transferShift(shiftId: number, newUserId: number) {
  const shift = await this.shiftRepository.findOne({ where: { id: shiftId } })
  const newUser = await this.userRepository.findOne({ where: { id: newUserId } })

  if (!shift) return `shift #${shiftId} not found`
  if (!newUser) return `user #${newUserId} not found`

  await shift.$set('users', [newUser.id])

  return await shift.$get('users')
}


  async remove(id: number) {
    await this.shiftRepository.destroy({where:{id: id}})
    return `This action removes a #${id} shift`;
  }
}
