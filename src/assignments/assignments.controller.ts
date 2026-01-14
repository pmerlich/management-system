import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CommanderGuard } from 'src/roles/roles.guard';


@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @UseGuards(CommanderGuard)
  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @UseGuards(CommanderGuard)
  @Get()
  findAll() {
    return this.assignmentsService.findAll();
  }

  @UseGuards(CommanderGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(Number(id));
  }
}
