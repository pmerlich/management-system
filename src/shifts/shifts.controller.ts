import { Controller, Request, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Put, Query } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { CommanderGuard, TokenGuard } from 'src/roles/roles.guard';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) { }

  @UseGuards(TokenGuard)
  @Post('create-shift')
  create(@Body() createShiftDto: CreateShiftDto,
    @Request() req: any) {
    return this.shiftsService.create(createShiftDto, req.user);
  }

  @UseGuards(CommanderGuard)
  @Post('create-shift-for-soldier/:id')
  createForSoldier(@Body() createShiftDto: CreateShiftDto,
    @Param() id: number) {
    return this.shiftsService.createForSoldier(createShiftDto, id);
  }

  @UseGuards(CommanderGuard)
  @Get()
  findAll() {
    return this.shiftsService.findAll();
  }

  @UseGuards(TokenGuard)
  @Get('my-shift')
  findOne(@Request() req: any) {
    return this.shiftsService.findAllByName(req.user);
  }

  @UseGuards(CommanderGuard)
  @Put('transfer')
  transfer(@Query('shiftId') shiftId: number, @Query('soldierId') soldierId: number ){
    return this.shiftsService.transferShift(shiftId, soldierId);
  }

  @UseGuards(CommanderGuard)
  @Delete(':id')
  remove(@Param('id') id: string,) {
    return this.shiftsService.remove(+id);
  }
}
