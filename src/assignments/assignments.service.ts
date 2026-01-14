import { Inject, Injectable } from '@nestjs/common';
import { Assignment } from './entities/assignment.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @Inject('ASSIGNMENT_REPOSITORY')
    private assignmentRepository: typeof Assignment
  ){}
}
