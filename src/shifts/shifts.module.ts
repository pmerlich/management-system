import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { DatabaseModule } from 'db/database.module';
import { usersProviders } from './entities/shift.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ShiftsController],
  providers: [ShiftsService,
    ...usersProviders
  ],
})
export class ShiftsModule {}
