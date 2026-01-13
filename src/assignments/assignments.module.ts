import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { DatabaseModule } from 'db/database.module';
import { assignmentProviders } from './entities/assignment.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AssignmentsController],
  providers: [AssignmentsService,
    ...assignmentProviders
  ],
})
export class AssignmentsModule {}
