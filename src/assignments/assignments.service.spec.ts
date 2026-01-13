import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentsService } from './assignments.service';

describe('AssignmentsService', () => {
  let service: AssignmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentsService],
    }).compile();

    service = module.get<AssignmentsService>(AssignmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});




//לטיפול בהמשך כקישורי הטבלאות
// async createshift(shift: Shift, Soldier:User) {
//         const newshift = await this.injectshift.create<Shifts>({ startTime: shift.startTime, endTime: shift.endTime, location: shift.location })
//         await newshift.$add('Users',Soldier.id)
//         return await Soldier.$get('shifts')
//     }