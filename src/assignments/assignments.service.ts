import { Inject, Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @Inject('ASSIGNMENT_REPOSITORY')
    private assignmentRepository: typeof Assignment
  ){}
  create(createAssignmentDto: CreateAssignmentDto) {
    return 'This action adds a new assignment';
  }

  async findAll() {
    return await this.assignmentRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} assignment`;
  }

  update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    return `This action updates a #${id} assignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignment`;
  }
}
