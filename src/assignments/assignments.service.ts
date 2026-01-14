import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    @Inject('ASSIGNMENT_REPOSITORY')
    private assignmentRepository: typeof Assignment
  ){}

  async create(createAssignmentDto: CreateAssignmentDto) {
    return await this.assignmentRepository.create({
      userId: createAssignmentDto.userId,
      shiftId: createAssignmentDto.shiftId,
    });
  }

  async findAll() {
    return await this.assignmentRepository.findAll();
  }

  async remove(id: number) {
    const deleted = await this.assignmentRepository.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Assignment #${id} not found`);
    }
    return `This action removes a #${id} assignment`;
  }
}
