import { Controller, Request, Get, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CommanderGuard, TokenGuard } from 'src/roles/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(CommanderGuard)
  @Get()
  findAll() {    
    return this.usersService.findAll();
  }

  @UseGuards(TokenGuard)
  @Get("user")
  findUser(@Request() req: any) {        
    return this.usersService.findUser(req.user);
  }

  @UseGuards(CommanderGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
